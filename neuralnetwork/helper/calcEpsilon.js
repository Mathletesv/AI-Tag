export default function calcEpsilon(before, after) {
	return Math.sqrt(6) / (Math.sqrt(before) + after);
}