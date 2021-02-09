import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { useQuery } from '@apollo/react-hooks';
import { GET_POKEMON_DETAIL } from '../graphql/api';
import { savePokemon } from '../database/db';
import { CatchModal } from '../components';

const color = {
	y: '#ecd465',
	w: '#ffffff',
	r: '#850000',
	b: '#000000'
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
	modal: css`display: block;`
};

export function PokemonDetail() {
	const [ pokemonData, setPokemonData ] = useState();
	const pathname = window.location.pathname;
	const pokemonName = pathname.split('/').pop();
	const { loading, data, error } = useQuery(GET_POKEMON_DETAIL, {
		variables: { name: pokemonName }
	});
	const [ showModal, setShowModal ] = useState(false);
	const [ success, setSuccess ] = useState(false);

	useEffect(
		() => {
			if (!loading) {
				setPokemonData(data.pokemon);
			}
		},
		[ loading, data ]
	);

	const handleCatch = () => {
		// random between 2 numbers to produce a 50% success rate
		let rate = Math.floor(Math.random() * 2);
		if (rate === 0) {
			try {
				setSuccess(true);
				console.log('Congrats! You got the pokemon!');
			} catch (error) {
				console.log(error);
			}
		} else {
			setSuccess(false);
			console.log('Sorry, you missed it.');
		}
		handleOpenModal();
	};

	const handleCloseModal = async () => {
		setShowModal(false);
	};

	const handleOpenModal = async () => {
		setShowModal(true);
	};

	const saveName = async (name) => {
		const data = { ...pokemonData };
		data.name = name;
		savePokemon(data);
	};

	return (
		<div className={styles.root}>
			{pokemonData ? (
				<div>
					<CatchModal
						className={styles.modal}
						success={success}
						closeModal={handleCloseModal}
						show={showModal}
						saveName={saveName}
					/>
					<h1 className={styles.title}>{String(pokemonData.name).toUpperCase()}</h1>
					<div className={styles.imageContainer}>
						<img src={pokemonData.sprites.front_default} alt={pokemonData.name} className={styles.image} />
					</div>
					<div className={styles.buttonContainer}>
						<button onClick={handleCatch} className={styles.button}>
							Catch!
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
					<h1 className={styles.title}>{String(pokemonName).toUpperCase()}</h1>
					<p className={styles.title}>Sorry, there's no data exist.</p>
				</div>
			)}
		</div>
	);
}
