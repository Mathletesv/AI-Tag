import randInitialize from './helper/randInitialize.js';
import prediction from './prediction.js';
import { ResultToKeys } from '../utility/mapNumKeys.js';
import forwardProp from './helper/forward.js';
import backPropagation from './backprop.js';
import cost from './cost.js';

export default class Network {
	constructor(input, hidden, output, layers, alpha, lambda) {
		this.input = input;
		this.hidden = hidden;
		this.output = output;
		if (layers == 0) {
			this.Thetas = [math.matrix(randInitialize(input, output))];
		}
		else {
			this.Thetas = [math.matrix(randInitialize(input, hidden))];
			for (let i = 0; i < layers - 1; i++) {
				this.Thetas.push(math.matrix(randInitialize(hidden, hidden)));
			}
			this.Thetas.push(math.matrix(randInitialize(hidden, output)));
		}
		this.alpha = alpha;
		this.lambda = lambda;
		this.trainingX = math.matrix([[], [], [], []]);
		this.trainingY = math.matrix([[], [], [], [], [], [], [], [], []]);
	}
	pushExample(x, keys) {
		this.trainingX = math.concat(this.trainingX, x, 1);
		this.trainingY = math.concat(this.trainingY, math.transpose(keys), 1);
	}
	gradient() {
		let AZs = forwardProp(this.trainingX, this.Thetas);
		let Deltas = backPropagation(AZs, this.Thetas, this.trainingY, this.lambda);
		console.log("DONE");
		for (let i = 0; i < this.Thetas.length; i++) {
			this.Thetas[i] = math.subtract(this.Thetas[i], math.multiply(this.alpha, Deltas[i]));
		}
		this.trainingX = math.matrix([[], [], [], []]);
		this.trainingY = math.matrix([[], [], [], [], [], [], [], [], []]);
	}
	cost() {
		let AZs = forwardProp(this.trainingX, this.Theta1, this.Theta2, this.Theta3);
		let J = cost(this.trainingY, AZs.A4, this.Theta1, this.Theta2, this.Theta3, this.lambda); 
	}
	outY() {
		let AZs = forwardProp(this.trainingX, this.Thetas);
		return AZs.last();
	}
	decision(x) {
		let val = prediction(x, this.Thetas);
		let keys = ResultToKeys[val];
		let dir = [0, 0];
		if (keys[0]) dir[1] = -1;
		else if (keys[1]) dir[1] = 1;
		if (keys[2]) dir[0] = -1;
		else if (keys[3]) dir[0] = 1;
		return dir;
	}
}