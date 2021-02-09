import React, { useState } from 'react';
import { useEffect } from 'react';
import { getAllPokemon, getAllPokemonKey } from '../database/db';
import { MyCard } from '../components';
import { css } from '@emotion/css';

const styles = {
	root: css`
		@media (max-width: 480px) {
			margin-top: 10vh;
			padding-bottom: 8vh;
		}
		margin-top: 15vh;
		width: 100vw;
		position: absolute;
	`,
	cards: css`
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	`,
	title: css`text-align: center;`
};

export function MyPokemonList() {
	const [ pokemonList, setPokemonList ] = useState([]);
	const [ pokemonKeys, setPokemonKeys ] = useState([]);
	const [ pokemonData, setPokemonData ] = useState([]);
	const [ getData, setGetData ] = useState(false);

	useEffect(
		() => {
			getAllPokemon().then((data) => {
				setPokemonList(data);
			});
			// get indexedDB keys
			getAllPokemonKey().then((data) => {
				setPokemonKeys(data);
			});

			var arr = [];
			for (let index = 0; index < pokemonList.length; index++) {
				const value = pokemonList[index];
				const key = pokemonKeys[index];
				var ob = {};
				ob.value = value;
				ob.key = key;
				arr.push(ob);
			}
			setPokemonData(arr);
			setGetData(false);
		},
		[ pokemonKeys, pokemonList, getData ]
	);

	const handleGetData = (getData) => {
		setGetData(getData);
	};

	return (
		<div className={styles.root}>
			<h1 className={styles.title}>My Pokemon List</h1>
			{pokemonData ? (
				<div className={styles.cards}>
					{pokemonData.map((pokemon) => <MyCard pokemon={pokemon} getData={handleGetData} />)}
				</div>
			) : (
				<div>
					<p>Sorry, there's no data exist.</p>
				</div>
			)}
		</div>
	);
}
