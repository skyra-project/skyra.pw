export default defineNuxtPlugin(() => {
	if (import.meta.client) {
		const warningStyles = ['color: red', 'background: yellow', 'font-size: 24px', 'font-weight: bold', 'padding: 10px'].join(';');

		const messageStyles = ['color: black', 'font-size: 16px', 'padding: 5px'].join(';');

		console.log('%c⚠️ WARNING! ⚠️', warningStyles);

		console.log('%cIf someone told you to copy/paste something here, it is very likely a scam.', messageStyles);

		console.log('%cPasting code here could give attackers access to your account.', messageStyles);
	}
});
