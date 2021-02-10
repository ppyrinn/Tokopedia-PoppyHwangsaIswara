import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import { GET_POKEMON_LIST } from '../graphql/api';
import { useQuery } from '@apollo/react-hooks';
import { Card } from '../components';

const color = {
	y: '#ecd465',
	w: '#ffffff'
};

const styles = {
	root: css`
		@media (max-width: 480px) {
			margin-top: 10vh;
			padding-bottom: 8vh;
		}
		margin-top: 15vh;
		position: absolute;
	`,
	cards: css`
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	`,
	buttons: css`
		text-align: center;
		margin-bottom: 20px;
		height: 60px;
	`,
	button: css`
		background-color: ${color.y};
		border: 1px solid;
		border-color: ${color.y};
		width: 150px;
		height: 50px;
		border-radius: 50px;
		@media (max-width: 480px) {
			width: 100px;
			height: 30px;
			border-radius: 20px;
		}
		@media (min-width: 481px) {
			&:hover {
				box-shadow: 0 4px 8px 0 rgba(209, 209, 209, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
				margin-top: -5px;
			}
		}
	`,
	buttonText: css`
		margin: 0;
		font-size: 15px;
	`,
	title: css`text-align: center;`
};

export function PokemonList() {
	const [ limit, setLimit ] = useState(20);

	const [ pokemons, setPokemons ] = useState([]);

	// get pokemon list from graphql-api
	const { loading, data, error } = useQuery(GET_POKEMON_LIST, {
		variables: { limit: limit, offset: 0 }
	});

	// set pokemon list to state when load the page
	useEffect(
		() => {
			if (!loading) {
				setPokemons(data.pokemons.results);
			}
		},
		[ loading, data, error ]
	);

	const handleLoadMore = () => {
		setLimit(limit + 20);
	};

	return (
		<div className={styles.root}>
			<h1 className={styles.title}>Pokemon List</h1>
			{pokemons ? (
				<div>
					<div className={styles.cards}>{pokemons.map((p) => <Card pokemon={p} key={p.id}/>)}</div>
					<div className={styles.buttons}>
						<button className={styles.button} onClick={handleLoadMore}>
							<h5 className={styles.buttonText}>Load more</h5>
						</button>
					</div>
				</div>
			) : (
				<div>
					<p>Sorry, there's no data exist.</p>
				</div>
			)}
		</div>
	);
}
