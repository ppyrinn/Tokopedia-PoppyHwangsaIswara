import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';
import { deletePokemon } from '../database/db';

const color = {
	y: '#ecd465',
	w: '#ffffff',
	r: '#850000'
};

const styles = {
	root: css`
		@media (max-width: 480px) {
			width: 150px;
			height: 300px;
			margin: 10px;
			.detail {
				text-align: center;
			}
		}
		@media (min-width: 481px) {
			border-radius: 100%;
			.detail {
				display: none;
			}
			&:hover {
				background-color: ${color.y};
			}
			&:hover .image {
				display: none;
			}
			&:hover .detail {
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
			&:focus {
				outline: 0;
			}
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
		margin-bottom: 15px;
		width: 120px;
		height: 40px;
		font-weight: bolder;
	`,
	buttonText: css`margin: 0;`,
	owned: css`margin: 0 0 15px 0;`,
	name: css`
		margin: 0 0 15px 0;
		font-weight: bold;
	`,
	releaseButton: css`
		@media (max-width: 480px) {
			background-color: ${color.r};
			&:focus {
				outline: 0;
			}
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
		border-radius: 20px;
		margin-bottom: 15px;
		width: 120px;
		height: 40px;
		font-weight: bolder;
		color: ${color.w};
	`,
	releaseButtonText: css``
};

export function MyCard({ pokemon, getData }) {
	const detail = pokemon.value;
	const key = pokemon.key;

	const handleRelease = async () => {
		try {
			await deletePokemon(key);
			await getData(true);
			console.log('You just released a pokemon.');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.root}>
			<img src={detail.sprites.front_default} alt={detail.name} class="image" />
			<div class="detail">
				<p className={styles.name}>{String(detail.name).toUpperCase()}</p>
				<Link to={'mylist/detail/' + key}>
					<button className={styles.button}>
						<p className={styles.buttonText}>See the detail</p>
					</button>
				</Link>
				<button className={styles.releaseButton} onClick={handleRelease}>
					Release
				</button>
			</div>
		</div>
	);
}
