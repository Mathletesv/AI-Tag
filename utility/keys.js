export default class Keys {
	constructor () {
		// [up, down, left, right];
		this.keys = [0, 0, 0, 0];
		this.keyToIndex = {
			"ArrowUp": 0,
			"w": 0,
			"ArrowDown": 1,
			"s": 1,
			"ArrowLeft": 2,
			"a": 2,
			"ArrowRight": 3,
			"d": 3
		};
		this.keyToOpposite = {
			"ArrowUp": 1,
			"w": 1,
			"ArrowDown": 0,
			"s": 0,
			"ArrowLeft": 3,
			"a": 3,
			"ArrowRight": 2,
			"d": 2
		};
	}
	getDirection () {
		// horizontical, vertical
		let dir = [0, 0];
		if (this.keys[0]) dir[1] = -1;
		else if (this.keys[1]) dir[1] = 1;
		if (this.keys[2]) dir[0] = -1;
		else if (this.keys[3]) dir[0] = 1;
		return dir;
	}
}