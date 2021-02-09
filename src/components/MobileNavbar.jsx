import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { css, cx } from '@emotion/css';

const color = {
	w: '#ffffff',
	g: '#8f8e8e'
};

const styles = {
	root: css`
		@media (max-width: 480px) {
			margin-bottom: 92vh;
			height: 10vh;
			width: 100vw;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			background-color: ${color.w};
			position: fixed;
			z-index: 1;
			display: flex;
			overflow: hidden;
			justify-content: center;
			align-items: center;
		}
		@media (min-width: 481px) {
			display: none;
		}
	`,
	menu: css`
		@media (max-width: 480px) {
			height: 100%;
			width: 25vw;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			text-align: center;
			background-color: ${color.w};
		}
	`,
	logo: css`
		@media (max-width: 480px) {
			background-color: ${color.w};
			width: 50vw;
			margin-left: 20px;
			margin-right: 20px;
		}
	`,
	imageLogo: css`
		@media (max-width: 480px) {
			max-width: 100%;
			width: 100px;
			height: auto;
		}
	`,
	image: css`
		@media (max-width: 480px) {
			max-width: 100%;
			width: 20px;
			height: auto;
			transform: rotate(270deg);
		}
	`,
	menuText: css`
		margin: 0;
		@media (max-width: 480px) {
			font-size: 11px;
			text-align: left;
		}
	`,
	button: css`
		background-color: ${color.w};
		border: 0px solid;
		width: 100%;
		height: auto;
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		&:focus {
			outline: 0;
		}
	`
};

export function MobileNavbar() {
	const location = useLocation();
	const history = useHistory();

	const currentPath = location.pathname;
	const goBack = () => {
		history.goBack();
	};

	return (
		<div className={styles.root}>
			<div className={styles.menu}>
				{currentPath !== '/' && currentPath !== '/mylist' ? (
					<button className={styles.button} onClick={goBack}>
						<img src="/back.png" alt="Back" className={styles.image} />
						<h5 className={styles.menuText}>Back</h5>
					</button>
				) : (
					<div />
				)}
			</div>
			<div className={styles.logo}>
				<img src="/logo.png" alt="Pokemon Web" className={styles.imageLogo} />
			</div>
		</div>
	);
}
