export function navigate(path: string, forceSameTab = false) {
	if (!forceSameTab && (path.startsWith('http') || path.startsWith('//') || path.startsWith('mailto:'))) {
		return () => window.open(path, '_blank', 'noreferrer=yes');
	}
	const Router = useRouter();
	return () => Router.push(path);
}
