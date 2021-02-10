import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';
import { getAllPokemon } from '../database/db';

const color = {
	y: '#ecd465',
	w: '#ffffff'
};

const styles = {
	root: css`
		@media (max-width: 480px) {
			width: 150px;
			height: 300px;
			margin: 10px;
			div {
				text-align: center;
			}
			img {
				max-width: 100%;
				height: auto;
				width: 100px;
			}
		}
		@media (min-width: 481px) {
			border-radius: 100%;
			div {
				display: none;
			}
			img {
				max-width: 100%;
				height: auto;
				width: 100px;
			}
			&:hover {
				background-color: ${color.y};
			}
			&:hover img {
				display: none;
			}
			&:hover div {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
		background-color: ${color.w};
		border: 1px solid;
		border-color: ${color.y};
		width: 200px;
		height: 200px;
		margin: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	`,
	button: css`
		@media (max-width: 480px) {
			background-color: ${color.y};
		}
		@media (min-width: 481px) {
			&:hover {
				box-shadow: 0 4px 8px 0 rgba(209, 209, 209, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
			}
			&:focus {
				outline: 0;
			}
		}
		background-color: ${color.w};
		border: 1px solid;
		border-color: ${color.w};
		border-radius: 20px;
		width: 120px;
		height: 40px;
		font-weight: bolder;
	`,
	buttonText: css`margin: 0;`,
	owned: css`margin: 0 0 15px 0;`,
	name: css`
		margin: 0 0 15px 0;
		font-weight: bold;
	`
};

export function Card({ pokemon }) {
	const [ pokemonList, setPokemonList ] = useState([]);
	const [ owned, setOwned ] = useState(0);

	useEffect(
		() => {
			getAllPokemon().then((data) => {
				setPokemonList(data);
			});
			if (pokemonList) {
				var counter = 0;
				pokemonList.forEach((p) => {
					if (pokemon.id === p.id) {
						counter = counter + 1;
					}
				});
				setOwned(counter);
			}
		},
		[ pokemonList, pokemon, owned ]
	);

	return (
		<div className={styles.root}>
			<img src={pokemon.image} alt={pokemon.name} />
			<div>
				<p className={styles.name}>{String(pokemon.name).toUpperCase()}</p>
				<p className={styles.owned}>
					You owned <b>{owned}</b> of them
				</p>
				<Link to={'/detail/' + pokemon.name}>
					<button className={styles.button}>
						<p className={styles.buttonText}>See the detail</p>
					</button>
				</Link>
			</div>
		</div>
	);
}
