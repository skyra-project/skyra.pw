export default defineNuxtPlugin(() => {
	if (import.meta.client && process.env.NODE_ENV === 'production') {
		const warningStyles = ['color: red', 'background: yellow', 'font-size: 24px', 'font-weight: bold', 'padding: 10px'].join(';');

		const messageStyles = ['color: white', 'font-size: 16px', 'padding: 5px', 'border: 2px solid black'].join(';');

		consola.log('%c⚠️ WARNING! ⚠️', warningStyles);

		consola.log('%cIf someone told you to copy/paste something here, it is very likely a scam.', messageStyles);

		consola.log('%cPasting code here could give attackers access to your account.', messageStyles);
	}
});
