export default function (str: string) {
	return str.replace(/[^0-9a-zA-Z]/gi, '');
}
