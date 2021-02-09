import React from 'react';
import { css } from '@emotion/css';

const color = {
	y: '#ecd465',
	w: '#ffffff',
	g: '#6d6b6b',
	r: '#850000'
};

const styles = {
	root: css`
		@media (max-width: 480px) {
			margin-top: 0vh;
		}
		@media (min-width: 481px) {
			margin-top: -15vh;
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
		@media (min-width: 481px) {
			&:hover {
				box-shadow: 0 4px 8px 0 rgba(209, 209, 209, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
			}
			&:focus {
				outline: 0;
			}

			margin-left: 20px;
		}
		background-color: ${color.r};
		border: 1px solid;
		border-color: ${color.r};
		color: ${color.w};
		border-radius: 20px;
		width: 120px;
		height: 45px;
		font-weight: bolder;
		margin-top: 30px;
		&:disabled {
			background-color: ${color.g};
			border-color: ${color.g};
		}
	`,
	title: css`
		@media (min-width: 481px) {
			margin-top: 60px;
		}
		@media (max-width: 480px) {
			margin-top: 40px;
		}
	`,
	displayBlock: css`display: block;`,
	displayNone: css`display: none;`
};

export function ConfirmationModal({ type, closeModal, show, action }) {
	const showHideClassName = show ? styles.displayBlock : styles.displayNone;

	const handleCloseModal = async () => {
		closeModal();
	};

	const handleRelease = async () => {
		action();
		closeModal();
	};

  const handleNameChange = () =>{
    action()
    closeModal()
  }

	return (
		<div className={showHideClassName}>
			<div className={styles.root}>
				<div className={styles.box}>
					{type === 'release' ? (
						<div className={styles.content}>
							<h3 className={styles.title}>Are you sure you want to release the pokemon?</h3>
							<div className={styles.imageContainer}>
								<img src="/release.png" alt="Release the pokemon" className={styles.image} />
							</div>
							<button className={styles.button} onClick={handleRelease}>
								Yes
							</button>
							<button className={styles.button} onClick={handleCloseModal}>
								No
							</button>
						</div>
					) : type === 'nameExist' ? (
						<div className={styles.content}>
							<h3 className={styles.title}>Sorry, that name is already exist.</h3>
							<div className={styles.imageContainer}>
								<img src="/name.png" alt="Name already exist" className={styles.image} />
							</div>
							<button className={styles.button} onClick={handleCloseModal}>
								Back
							</button>
						</div>
					) : type === 'changeName' ? (
						<div className={styles.content}>
							<h3 className={styles.title}>The pokemon's name has changed.</h3>
							<div className={styles.imageContainer}>
								<img src="/changeName.png" alt="Name successfully changed" className={styles.image} />
							</div>
							<button className={styles.button} onClick={handleNameChange}>
								Back
							</button>
						</div>
					) : (
						<div />
					)}
				</div>
			</div>
		</div>
	);
}
