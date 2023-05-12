export default class Enemy {
	constructor() {
		this.attack = true;
		this.reset();
	}
	reset() {
		this.attack = !this.attack;
		if (this.attack) {
			this.x = 50;
			this.y = 450;
			this.fillStyle = "blue";
		}
		else {
			this.x = 900;
			this.y = 450;
			this.fillStyle = "red";
		}
		this.radius = 25;
		this.speed = 5;
	}
	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.fillStyle;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
	}
	update(time, keys, ctx) {
		this.x += this.speed * keys[0];
		if (this.x < 25) this.x = 25;
		else if (this.x > 1575) this.x = 1575;
		this.y += this.speed * keys[1];
		if (this.y < 25) this.y = 25;
		else if (this.y > 875) this.y = 875;
		this.draw(ctx);
	}
}