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

	return response.json();
}

export function navigate(path) {
	return () => history.push(path);
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
