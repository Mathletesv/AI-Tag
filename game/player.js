export default class Player {
	constructor() {
		this.attack = false;
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
	update(time, keys, enemy, ctx) {
		this.x += this.speed * keys[0];
		if (this.x < 25) this.x = 25;
		else if (this.x > 1575) this.x = 1575;
		this.y += this.speed * keys[1];
		if (this.y < 25) this.y = 25;
		else if (this.y > 875) this.y = 875;
		this.draw(ctx);
		if (this.x > 1475 && this.attack) return 1;
		else if (this.collision(enemy)) {
			return (this.attack ? 2 : 1);
		}
		else if (enemy.x > 1475 && !this.attack) return 2;
		return 0;
	}
	collision(enemy) {
		if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) <= 50) return true;
	}
}