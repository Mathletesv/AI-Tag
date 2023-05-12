import forwardProp from './helper/forward.js';
import getDimen from './helper/getDimension.js';

export default function predict(X, Theta1, Theta2, Theta3) {
	const result = forwardProp(X, Theta1, Theta2, Theta3);
	const Y = result.As.last();
	let final = [];
	for (let i = 0; i < getDimen(Y, 1); i++) {
		final.push(0);
		for (let j = 1; j < getDimen(Y, 0); j++) {
			if (Y.subset(math.index(j, i)) > Y.subset(math.index(final[i], i))) {
				final[i] = j;
			}
		}
	}
	//console.log(Y, final);
	return final;
}