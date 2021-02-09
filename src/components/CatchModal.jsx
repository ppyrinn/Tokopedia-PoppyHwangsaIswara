import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import { getAllPokemon } from '../database/db';

const color = {
	y: '#ecd465',
	w: '#ffffff',
	g: '#6d6b6b',
	r: '#850000'
};

const styles = {
	root: css`
		@media (max-width: 480px) {
			margin-top: -3.2vh;
		}
		@media (min-width: 481px) {
			margin-top: -17.5vh;
		}
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		z-index: 1;
	`,
	box: css`
		@media (max-width: 480px) {
			width: 80vw;
			height: 70vh;
			margin-top: 15vh;
			margin-left: 10vw;
			background-color: ${color.w};
			border: 1px solid;
			border-radius: 20px;
			border-color: ${color.w};
		}
		@media (min-width: 481px) {
			width: 60vw;
			height: 50vh;
			margin-top: 25vh;
			margin-left: 20vw;
			background-color: ${color.w};
			border: 1px solid;
			border-radius: 100px;
			border-color: ${color.w};
		}
	`,
	content: css`text-align: center;`,
	imageContainer: css`width: 100%;`,
	image: css`
		max-width: 100%;
		width: 200px;
		height: auto;
		margin-top: 10px;
	`,
	input: css`
		@media (max-width: 480px) {
			width: 80%;
		}
		margin-top: 20px;
		width: 30%;
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
	button: css`
		@media (max-width: 480px) {
			margin-top: 35px;
		}
		@media (min-width: 481px) {
			&:hover {
				box-shadow: 0 4px 8px 0 rgba(209, 209, 209, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
			}
			&:focus {
				outline: 0;
			}
		}
		background-color: ${color.r};
		border: 1px solid;
		border-color: ${color.r};
		color: ${color.w};
		border-radius: 20px;
		width: 120px;
		height: 45px;
		font-weight: bolder;
		margin-top: 20px;
		&:disabled {
			background-color: ${color.g};
			border-color: ${color.g};
		}
	`,
	title: css`
		@media (min-width: 481px) {
			margin-top: 30px;
		}
		@media (max-width: 480px) {
			margin-top: 40px;
		}
	`,
	displayBlock: css`display: block;`,
	displayNone: css`display: none;`,
	error: css`
		font-size: 15px;
		color: ${color.r};
		font-weight: bolder;
		margin: 0;
	`,
	success: css`
		font-size: 15px;
		font-weight: bolder;
		margin: 0;
	`
};

export function CatchModal({ success, closeModal, show, saveName }) {
	const [ name, setName ] = useState('');
	const showHideClassName = show ? styles.displayBlock : styles.displayNone;
	const [ pokemonList, setPokemonList ] = useState([]);
	const [ nameExist, setNameExist ] = useState(false);
	const [ checked, setChecked ] = useState(false);

	useEffect(
		() => {
			getAllPokemon().then((data) => {
				setPokemonList(data);
			});
		},
		[ pokemonList ]
	);

	const handleName = async (e) => {
		await setName(e.target.value);
		await setChecked(false);
		await setNameExist(false);
	};

	const handleLost = async () => {
		closeModal();
	};

	const handleGotcha = async () => {
		if (!nameExist) {
			await saveName(name);
			await setName('');
			await closeModal();
		}
	};

	const handleCheckName = async () => {
		for (let index = 0; index < pokemonList.length; index++) {
			const element = pokemonList[index].name;
			if (String(element).toLowerCase() === name.toLowerCase()) {
				await setNameExist(true);
				break;
			} else {
				await setNameExist(false);
			}
		}
		await setChecked(true);
	};

	return (
		<div className={showHideClassName}>
			<div className={styles.root}>
				<div className={styles.box}>
					{success === true ? (
						<div className={styles.content}>
							<h3 className={styles.title}>Congrats! You got the pokemon!</h3>
							<div className={styles.imageContainer}>
								<img src="/gotcha.png" alt="congrats!" className={styles.image} />
							</div>
							<input
								placeholder="Let's give it a nickname!"
								className={styles.input}
								value={name}
								onChange={handleName}
							/>
							{nameExist === true ? (
								<p className={styles.error}>Sorry, that name is already exist.</p>
							) : nameExist === false && checked === true ? (
								<p className={styles.success}>You can use this name.</p>
							) : (
								<p className={styles.error} />
							)}
							<button
								className={styles.button}
								disabled={!name || nameExist}
								onClick={checked ? handleGotcha : handleCheckName}
							>
								{checked ? 'Save!' : 'Check'}
							</button>
						</div>
					) : (
						<div className={styles.content}>
							<h3 className={styles.title}>Sorry, you missed it.</h3>
							<div className={styles.imageContainer}>
								<img src="/left.png" alt="sorry" className={styles.image} />
							</div>
							<button className={styles.button} onClick={handleLost}>
								Back
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
