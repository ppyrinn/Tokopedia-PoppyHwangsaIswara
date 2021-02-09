import { set, get, update, values, keys, del } from 'idb-keyval';
import { v4 as uuidv4 } from 'uuid';

export async function savePokemon(pokemon) {
	await set(uuidv4(), pokemon);
}

export async function getAllPokemon() {
	return new Promise((resolve) => {
		values().then((val) => {
			resolve(val);
		});
	});
}

export async function getAllPokemonKey() {
	return new Promise((resolve) => {
		keys().then((keys) => {
			resolve(keys);
		});
	});
}

export async function getPokemonByKey(key) {
	return new Promise((resolve) => {
		get(key).then((val) => {
			resolve(val);
		});
	});
}

export async function deletePokemon(key) {
	await del(key);
}

export async function updatePokemon(key, pokemon) {
	await update(key, () => pokemon)
}