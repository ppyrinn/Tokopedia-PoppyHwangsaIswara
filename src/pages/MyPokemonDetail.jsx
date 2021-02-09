import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { getPokemonByKey, deletePokemon, updatePokemon, getAllPokemon } from '../database/db';
import { ConfirmationModal } from '../components';

const color = {
	y: '#ecd465',
	w: '#ffffff',
	r: '#850000',
	b: '#000000',
	g: '#6d6b6b'
};

const styles = {
	root: css`
		@media (max-width: 480px) {
			margin-top: 10vh;
			padding-bottom: 8vh;
		}
		margin-top: 15vh;
		position: absolute;
		width: 100vw;
	`,
	title: css`text-align: center;`,
	imageContainer: css`
		text-align: center;
		width: 100vw;
		height: 200px;
	`,
	image: css`
		max-width: 100%;
		height: auto;
		width: 200px;
		border: 5px solid;
		border-radius: 100%;
		border-color: ${color.y};
	`,
	buttonContainer: css`
		text-align: center;
		margin-top: 20px;
		height: 60px;
	`,
	button: css`
		width: 150px;
		height: 50px;
		background-color: ${color.r};
		color: ${color.w};
		border-color: ${color.r};
		border: 1px solid;
		border-radius: 50px;
		font-weight: bold;
		font-size: 15px;
		@media (min-width: 481px) {
			margin-top: 5px;
			&:hover {
				box-shadow: 0 4px 8px 0 rgba(209, 209, 209, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
				margin-top: -1px;
			}
			&:focus {
				outline: 0;
			}
		}
	`,
	detail: css`
		@media (max-width: 480px) {
			width: 100vw;
		}
		@media (min-width: 481px) {
			width: 50vw;
		}
	`,
	detailContainer: css`
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
		margin-top: 20px;
	`,
	labelConainter: css`
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	`,
	label: css`
		width: 100px;
		height: 30px;
		margin: 10px;
		font-weight: bolder;
		background-color: ${color.y};
		border: 1px solid;
		border-color: ${color.y};
		color: ${color.b};
		border-radius: 20px;
		font-size: 12px;
		text-align: center;
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
	`,
	input: css`
		@media (max-width: 480px) {
			width: 60%;
			margin-top: 40px;
		}
		margin-top: 20px;
		width: 25%;
		text-align: center;
		height: 40px;
		border-radius: 20px;
		border: 3px solid;
		border-color: ${color.g};
		font-weight: bold;
		&:focus {
			outline: 0;
		}
	`,
	saveButton: css`
		width: 150px;
		height: 50px;
		background-color: ${color.y};
		color: ${color.b};
		border-color: ${color.y};
		border: 0px solid;
		border-radius: 50px;
		font-weight: bold;
		font-size: 15px;
		&:disabled {
			background-color: ${color.g};
			border-color: ${color.g};
			color: ${color.w};
		}
		@media (max-width: 480px) {
			margin-top: 20px;
		}
		@media (min-width: 481px) {
			margin-top: 5px;
			margin-left: 20px;
			&:hover {
				box-shadow: 0 4px 8px 0 rgba(209, 209, 209, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
				margin-top: -1px;
			}
			&:focus {
				outline: 0;
			}
		}
	`,
	renameContainer: css`
		text-align: center;
		@media (min-width: 481px) {
			margin-top: 20px;
		}
	`
};

export function MyPokemonDetail() {
	const [ pokemonData, setPokemonData ] = useState();
	const pathname = window.location.pathname;
	const key = pathname.split('/').pop();
	const history = useHistory();
	const [ name, setName ] = useState('');
	const [ showModal, setShowModal ] = useState(false);
	const [ type, setType ] = useState('');
	const [ pokemonList, setPokemonList ] = useState([]);
	const [ changeName, setChangeName ] = useState(false);

	useEffect(
		() => {
			getPokemonByKey(key).then((data) => {
				setPokemonData(data);
			});
		},
		[ key, pokemonData ]
	);

	useEffect(
		() => {
			getAllPokemon().then((data) => {
				setPokemonList(data);
			});
		},
		[ pokemonList ]
	);

	const handleRelease = () => {
		setType('release');
		setChangeName(false);
		handleOpenModal();
	};

	const handleConfirmedRelease = () => {
		try {
			deletePokemon(key);
			console.log('You just released a pokemon.');
			history.push({
				pathname: '/mylist'
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleInput = async (e) => {
		await setName(e.target.value);
	};

	const handleUpdateData = async () => {
		var change = '';

		for (let index = 0; index < pokemonList.length; index++) {
			const element = pokemonList[index].name;
			if (String(element).toLowerCase() === name.toLowerCase()) {
				change = 'nameExist';
				break;
			} else {
				change = 'changeName';
			}
		}

		await setType(change);
		await setChangeName(true);

		await console.log(type);

		await handleOpenModal();
	};

	const handleNameChange = async () => {
		console.log('it should be changing the name');
		const data = pokemonData;
		data.name = name.toLowerCase();
		await setPokemonData(data);
		console.log(pokemonData);
		try {
			await updatePokemon(key, pokemonData);
			console.log('You just updated the name.');
		} catch (error) {
			console.log(error);
		}
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleOpenModal = () => {
		setShowModal(true);
	};

	return (
		<div className={styles.root}>
			<ConfirmationModal
				type={type}
				closeModal={handleCloseModal}
				show={showModal}
				action={changeName ? handleNameChange : handleConfirmedRelease}
			/>
			{pokemonData ? (
				<div>
					<h1 className={styles.title}>{String(pokemonData.name).toUpperCase()}</h1>
					<div className={styles.imageContainer}>
						<img src={pokemonData.sprites.front_default} alt={pokemonData.name} className={styles.image} />
					</div>
					<div className={styles.renameContainer}>
						<input onChange={handleInput} placeholder={pokemonData.name} value={name} className={styles.input} />
						<button onClick={handleUpdateData} className={styles.saveButton} disabled={!name}>
							Save
						</button>
					</div>
					<div className={styles.buttonContainer}>
						<button onClick={handleRelease} className={styles.button}>
							Release
						</button>
					</div>
					<div className={styles.detailContainer}>
						<div className={styles.detail}>
							<h3 className={styles.title}>Moves</h3>
							<div className={styles.labelConainter}>
								{pokemonData.moves.map((m) => <div className={styles.label}>{m.move.name}</div>)}
							</div>
						</div>
						<div className={styles.detail}>
							<h3 className={styles.title}>Types</h3>
							<div className={styles.labelConainter}>
								{pokemonData.types.map((t) => <div className={styles.label}>{t.type.name}</div>)}
							</div>
						</div>
					</div>
				</div>
			) : (
				<div>
					<p className={styles.title}>Sorry, there's no data exist.</p>
				</div>
			)}
		</div>
	);
}
