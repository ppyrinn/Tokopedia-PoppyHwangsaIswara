import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/css';

const color = {
	w: '#ffffff',
	g: '#8f8e8e',
	gb: '#cfcccc'
};

const styles = {
	root: css`
		@media (max-width: 480px) {
			margin-top: 92vh;
			height: 8vh;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			border-top: 0.3px solid;
			border-color: ${color.g};
		}
		@media (min-width: 481px) {
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		}
		background-color: ${color.w};
		position: fixed;
		width: 100vw;
		height: 15vh;
		z-index: 1;
		display: flex;
		overflow: hidden;
		justify-content: center;
		align-items: center;
	`,
	menu: css`
		@media (max-width: 480px) {
			height: 100%;
			width: 50vw;
			border-left: 0.3px solid;
			border-color: ${color.g};
		}
		height: 100%;
		width: 200px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		background-color: ${color.w};
	`,
	menuActive: css`
		@media (max-width: 480px) {
			height: 100%;
			width: 50vw;
			border-left: 0.3px solid;
			border-color: ${color.g};
		}

		height: 100%;
		width: 200px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		background-color: ${color.gb};
	`,
	logo: css`
		@media (max-width: 480px) {
			display: none;
		}
		background-color: ${color.w};
		width: 300px;
		margin-left: 20px;
		margin-right: 20px;
	`,
	imageLogo: css`
		@media (min-width: 481px) {
			max-width: 100%;
			height: auto;
		}
	`,
	image: css`
		@media (min-width: 481px) {
			max-width: 100%;
			width: 80px;
			height: auto;
		}
		@media (max-width: 480px) {
			max-width: 100%;
			width: 20px;
			height: auto;
		}
	`,
	menuText: css`
		margin: 0;
		@media (max-width: 480px) {
			font-size: 11px;
		}
	`,
	link: css`
		text-decoration: none;
		color: black;
		@media (min-width: 481px) {
			&:hover {
				margin-top: -10px;
			}
		}
	`
};

export function TabBar() {
	const location = useLocation();
	const currentPath = location.pathname;
	return (
		<div className={styles.root}>
			<div className={currentPath === '/' ? styles.menuActive : styles.menu}>
				<Link to="/" className={styles.link}>
					<img src="/list.png" alt="Pokemon List" className={styles.image} />
					<h5 className={styles.menuText}>Pokemon List</h5>
				</Link>
			</div>
			<div className={styles.logo}>
				<img src="/logo.png" alt="Pokemon Web" className={styles.imageLogo} />
			</div>
			<div className={currentPath === '/mylist' ? styles.menuActive : styles.menu}>
				<Link to="/mylist" className={styles.link}>
					<img src="/mylist.png" alt="My Pokemon List" className={styles.image} />
					<h5 className={styles.menuText}>My Pokemon List</h5>
				</Link>
			</div>
		</div>
	);
}
