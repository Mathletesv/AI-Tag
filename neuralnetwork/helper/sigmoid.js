export default function sigmoid(Z) {
	return math.dotDivide(1, math.add(math.exp(math.multiply(Z, -1)), 1));
}