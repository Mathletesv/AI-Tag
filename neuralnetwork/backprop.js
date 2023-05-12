import getDimen from './helper/getDimension.js';
import sigmoid from './helper/sigmoid.js';

export default function backPropagation(AZs, Thetas, Y, lambda){
	// To get all columns/rows except 1, get that 1 and undo what was done on all.
	/* Octave code 
	delta3 = A3' - Y;
	delta2 = Theta2' * delta3 .* [ones(1, size(Z2, 2)); sigmoidGradient(Z2)];
	Theta2_grad = delta3 * A2;
	Theta1_grad = delta2(2:end, :) * A1;
	Theta1_grad = Theta1_grad ./ m;
	Theta2_grad = Theta2_grad ./ m;
	Theta1_grad(:, 2:end) += lambda / m * Theta1(:, 2:end);
	Theta2_grad(:, 2:end) += lambda / m * Theta2(:, 2:end);
	*/
	//console.log(AZs, Y);
	let deltas = [math.subtract(AZs.As.last(), Y)];
	let i = Thetas.length - 1;
	//console.log(i, Thetas[i], AZs.Zs[i], deltas.last());
	if (Thetas.length > 1) {
		deltas.push(math.dotMultiply(math.multiply(math.transpose(Thetas.last()), deltas.last()),
			math.concat(math.ones(1, getDimen(AZs.Zs[i - 1], 1)), math.dotMultiply(sigmoid(AZs.Zs[i - 1]), 
			math.subtract(1, sigmoid(AZs.Zs[i - 1]))), 0)));
	}
	for (i = Thetas.length - 2; i > 0; i--) {
		deltas.push(math.dotMultiply(math.multiply(math.transpose(Thetas[i]), deltas.last().subset(
			math.index(math.range(1, getDimen(deltas.last(), 0)), math.range(0, getDimen(deltas.last(), 1))))),
			math.concat(math.ones(1, getDimen(AZs.Zs[i], 1)), math.dotMultiply(sigmoid(AZs.Zs[i]), 
			math.subtract(1, sigmoid(AZs.Zs[i]))), 0)));
	}
	let m = getDimen(Y, 1);
	deltas.reverse();
	//console.log(Thetas.last(), deltas.last(), AZs.As[AZs.As.length - 2]);
	let grads = [math.add(math.divide(math.multiply(deltas.last(), 
	math.transpose(AZs.As[AZs.As.length - 2])), m), math.multiply(lambda / m, Thetas.last()))];
	for (let i = deltas.length - 2; i >= 0; i--) {
		let TempGrad = math.divide(math.multiply(deltas[i].subset(math.index(math.range(1, getDimen(deltas[i], 0)), 
		math.range(0, getDimen(deltas[i], 1)))), math.transpose(AZs.As[i])), m);
		//console.log(TempGrad, Thetas[i], deltas[i], AZs.As[i]);
		grads.push(math.add(TempGrad, math.multiply(lambda / m, Thetas[i])));
	}
	/*let delta4 = math.subtract(AZs.A4 - Y);
	let delta3 = math.dotMultiply(math.multiply(math.transpose(Theta3), delta4),
			math.concat(math.ones(1, getDimen(AZs.Z3, 1)), math.dotMultiply(sigmoid(AZs.Z3), math.subtract(1, sigmoid(AZs.Z3))), 0));
	let delta2 = math.dotMultiply(math.multiply(math.transpose(Theta2), delta3.subset(
			math.index(math.range(1, getDimen(delta3, 0)), math.range(0, getDimen(delta3, 1))))),
			math.concat(math.ones(1, getDimen(AZs.Z2, 1)), math.dotMultiply(sigmoid(AZs.Z2), math.subtract(1, sigmoid(AZs.Z2))), 0));
	let m = getDimen(Y, 1);
	//console.log(delta3, AZs.A2);
	let Theta3_grad = math.divide(math.multiply(delta4, math.transpose(AZs.A3)), m);
	let Theta1_grad = math.divide(math.multiply(delta2.subset(math.index(math.range(1, 
	getDimen(delta2, 0)), math.range(0, getDimen(delta2, 1)))), math.transpose(AZs.A1)), m);
	let Theta2_grad = math.divide(math.multiply(delta3.subset(math.index(math.range(1, 
	getDimen(delta3, 0)), math.range(0, getDimen(delta3, 1)))), math.transpose(AZs.A2)), m);
	Theta1_grad = math.add(Theta1_grad, math.multiply(lambda / m, Theta1));
	Theta2_grad = math.add(Theta2_grad, math.multiply(lambda / m, Theta2));
	Theta3_grad = math.add(Theta3_grad, math.multiply(lambda / m, Theta3));*/
	// Make it so the bias unit isn't regularized later.
	return grads.reverse();
}