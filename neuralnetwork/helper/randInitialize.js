import calcEpsilon from './calcEpsilon.js';

export default function randInitialize(before, after) {
	return math.random([after, before + 1], -calcEpsilon(before, after), calcEpsilon(before, after));
}