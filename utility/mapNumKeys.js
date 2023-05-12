const KeySumToResult = {
	0: math.matrix([[1, 0, 0, 0, 0, 0, 0, 0, 0]]),
	1: math.matrix([[0, 1, 0, 0, 0, 0, 0, 0, 0]]),
	2: math.matrix([[0, 0, 1, 0, 0, 0, 0, 0, 0]]),
	4: math.matrix([[0, 0, 0, 1, 0, 0, 0, 0, 0]]),
	8: math.matrix([[0, 0, 0, 0, 1, 0, 0, 0, 0]]),
	5: math.matrix([[0, 0, 0, 0, 0, 1, 0, 0, 0]]),
	9: math.matrix([[0, 0, 0, 0, 0, 0, 1, 0, 0]]),
	6: math.matrix([[0, 0, 0, 0, 0, 0, 0, 1, 0]]),
	10: math.matrix([[0, 0, 0, 0, 0, 0, 0, 0, 1]])
}

export const ResultToKeys = {
	0: [0, 0, 0, 0],
	1: [1, 0, 0, 0],
	2: [0, 1, 0, 0],
	3: [0, 0, 1, 0],
	4: [0, 0, 0, 1],
	5: [1, 0, 1, 0],
	6: [1, 0, 0, 1],
	7: [0, 1, 1, 0],
	8: [0, 1, 0, 1]
};

function sumKeys (keys) {
	return keys[0] + keys[1] * 2 + keys[2] * 4 + keys[3] * 8;
}

export function keysToResult(keys) {
	return KeySumToResult[sumKeys(keys)];
}