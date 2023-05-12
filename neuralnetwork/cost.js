import getDimen from './helper/getDimension.js';

export default function cost(Y, A3, Theta1, Theta2, lambda) {
	/* octave code 
	J = 1 / m * sum(sum((-1 .* Y .* log(A3)'  - (1 - Y) .* log (1 .- A3)')));
	J += lambda / (2 * m) * (sum(sum((Theta1(:, 2:end) .^ 2))) + sum(sum((Theta2(:, 2:end) .^ 2))));
	*/
	const m = getDimen(Y, 1);
	let J = math.divide(math.sum(math.multiply(-1, math.add(
	math.dotMultiply(Y, math.transpose(math.log(A3))), math.dotMultiply(
	math.subtract(1, Y), math.transpose(math.log(math.subtract(1, A3))))))), m);
	J += math.multiply(lambda / (2 * m), math.sum(math.dotPow(Theta1, 2)),
	 math.sum(math.dotPow(Theta2, 2)));
	// To-do later maybe: have the bias term not be regularized
	return J;  
}