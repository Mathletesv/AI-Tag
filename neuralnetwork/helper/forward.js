import sigmoid from './sigmoid.js';
import getDimen from './getDimension.js';

export default function forwardProp(X, Thetas) {
	let As = [math.concat(math.ones(1, getDimen(X, 1)), X, 0)];
	let Zs = [];
	for (let i = 0; i < Thetas.length - 1; i++) {
		Zs.push(math.multiply(Thetas[i], As.last()));
		let TempA = sigmoid(Zs.last());
		TempA = math.concat(math.ones(1, getDimen(TempA, 1)), TempA, 0);
		As.push(TempA);
	}
	Zs.push(math.multiply(Thetas.last(), As.last()));
	As.push(sigmoid(Zs.last()));
	return {
		"As": As,
		"Zs": Zs
	};
	/*let Z2 = math.multiply(Theta1, A1);
	let A2 = sigmoid(Z2);
	A2 = math.concat(math.ones(1, getDimen(A2, 1)), A2, 0);
	let Z3 = math.multiply(Theta2, A2);
	let A3 = sigmoid(Z3);
	A3 = math.concat(math.ones(1, getDimen(A3, 1)), A3, 0);
	let Z4 = math.multiply(Theta3, A3);
	let A4 = sigmoid(Z4);
	return {
		"A1": A1,
		"Z2": Z2,
		"A2": A2,
		"Z3": Z3,
		"A3": A3,
		"Z4": Z4,
		"A4": A4
	};*/
}