import { setGlobal, useRef, useEffect, getGlobal } from 'reactn';
import { history, BASE_API_URL } from 'meta/constants';

export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function useTraceUpdate(props) {
	const prev = useRef(props);
	useEffect(() => {
		const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
			if (prev.current[k] !== v) {
				ps[k] = [prev.current[k], v];
			}
			return ps;
		}, {});
		if (Object.keys(changedProps).length > 0) {
			console.info('Changed props:', changedProps);
		}
		prev.current = props;
	});
}

export function logOut() {
	localStorage.clear();
	setGlobal({ user: null, token: null, authenticated: false });
	history.replace('/');
}

export const loadState = key => {
	try {
		let serializedState = localStorage.getItem(key);
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

export const saveState = (key, state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(key, serializedState);
	} catch (err) {}
};

export async function syncUser() {
	const authenticated = getGlobal().authenticated;
	if (!authenticated) return;
	const response = await authedFetch('/oauth/user', {
		method: 'POST',
		body: {
			action: 'SYNC_USER'
		}
	}).catch(err => {
		// TODO toast
		console.error(`Failed to sync user.`, err);
	});

	if (response && response.user) {
		saveState('discord_user', response.user);
		setGlobal({ user: response.user });
	}
}

export async function authedFetch(path, options = { headers: {} }) {
	if (!options.headers) options.headers = {};
	options.headers.authorization = getGlobal().token;
	return apiFetch(path, options);
}

export async function apiFetch(path, options = {}) {
	if (process.env.NODE_ENV === 'development') {
		await sleep(1000);
	}
	if (options.body) options.body = JSON.stringify(options.body);
	if (!options.headers) options.headers = {};
	options.headers['Content-Type'] = 'application/json';

	const response = await fetch(`${BASE_API_URL}${path}`, options);

	const jsonResponse = await response.json();

	if (jsonResponse.error) {
		throw new Error(jsonResponse.error);
	} else {
		return jsonResponse;
	}
}

export function navigate(path) {
	if (path.startsWith('http')) {
		return () => (window.location.href = path);
	} else {
		return () => history.push(path);
	}
}

export function toTitleCase(str) {
	let splitStr = str.toLowerCase().split(' ');
	for (let i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(' ');
}

export function displayAvatarURL(user, { format = 'default', size }) {
	if (user.avatar === null) return `https://cdn.discordapp.com/embed/avatars/${user.discriminator}.png`;
	if (format === 'default') format = user.avatar.startsWith('a_') ? 'gif' : 'webp';
	return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}${size ? `?size=${size}` : ''}`;
}

export function getAcronym(name) {
	return name.replace(/\w+/g, part => part[0]).replace(/\s/g, '');
}

export function removeNonAlphaNumeric(str) {
	return str.replace(/[^0-9a-zA-Z]/gi, '');
}

/**
 * Check if a bit is set in a bitfield.
 * @param {number} bits The bitfield value to check.
 * @param {number} bit The bit to check.
 */
export function bitwiseHas(bits, bit) {
	return (bits & bit) === bit;
}

/**
 * Toggle a bit in a bitfield.
 * @param {number} bits The bitfield value to modify.
 * @param {number} bit The bit to toggle.
 * @param {boolean} toggle The value to set.
 */
export function bitwiseSet(bits, bit, toggle) {
	console.log(toggle);
	return toggle ? bits | bit : bits & ~bit;
}
