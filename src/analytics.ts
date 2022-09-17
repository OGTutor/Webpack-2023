import * as $ from 'jquery';

const createAnalytics = (): object => {
	let counter = 0;
	let destroyed: boolean = false;

	console.log('Test');

	const listener = (): number => counter++;

	$(document).on('click', listener);

	return {
		destroy() {
			$(document).off('click', listener);
			destroyed = true;
		},

		getClicks() {
			if (destroyed) {
				return `Analytics is destroyed! Total clicks is ${counter}!`;
			}
			return `Total clicks is ${counter}!`;
		},
	};
};

window['analytics'] = createAnalytics();
