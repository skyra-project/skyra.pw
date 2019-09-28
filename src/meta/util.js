import { setGlobal, useRef, useEffect, getGlobal } from 'reactn';
import { history, BASE_API_URL } from 'meta/constants';

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
	options.headers.authorization = getGlobal().token;
	return apiFetch(`${BASE_API_URL}${path}`, options);
}

export async function apiFetch(path, options) {
	options.body = JSON.stringify(options.body);
	if (!options.headers) options.headers = {};
	options.headers['Content-Type'] = 'application/json';

	const response = await fetch(`${BASE_API_URL}${path}`, options);

	return response.json();
}
