import randInitialize from './neuralnetwork/helper/randInitialize.js';
import scaler from './utility/scaler.js';
import predict from './neuralnetwork/prediction.js';
import { keysToResult } from './utility/mapNumKeys.js';
import Network from './neuralnetwork/network.js';
import Player from './game/player.js';
import Keys from './utility/keys.js';
import Enemy from './game/enemy.js';
import genMatrix from './utility/genMatrix.js';

const canvas = document.getElementById("canvas");
const menu = document.getElementById("menu");
const ctx = canvas.getContext("2d");
let time = new Date().getTime();

window.onload = function(){
	canvas.style.display = "none";
  	scaler();
  	window.onresize = scaler;
	Array.prototype.last = function() {
		return this[this.length - 1];
	}
}

const inputs = 4;
const hidden = 50;
const layers = 0;
const output = 9;
const alpha = 1;
const lambda = 0;

let defender = new Network(inputs, hidden, output, layers, alpha, lambda);
let attacker = new Network(inputs, hidden, output, layers, alpha, lambda);
let player = new Player();
let enemy = new Enemy();
let keys = new Keys();
let attacking = true;

function down (key) {
	if (key.key in keys.keyToIndex) {
		keys.keys[keys.keyToIndex[key.key]] = true;
		keys.keys[keys.keyToOpposite[key.key]] = false;
	}
	else if (key.key == "l") {
		//console.log(defender.Theta1, defender.Theta2, attacker.Theta1, attacker.Theta2);
		//console.log(defender.cost(), attacker.cost());
		console.log(defender.outY(), attacker.outY());
	}
}
function up (key) {
	if (key.key in keys.keyToIndex) {
		keys.keys[keys.keyToIndex[key.key]] = false;
	}
}

function update() {
	ctx.fillStyle = "white"
	ctx.fillRect(0, 0, 1600, 900);
	ctx.fillStyle = "green";
	ctx.fillRect(1500, 0, 100, 900);
	let delta = new Date().getTime() - time;
	if (attacking) {
		attacker.pushExample(genMatrix(player.x, player.y, enemy.x, enemy.y), keysToResult(keys.keys));
		enemy.update(delta / 1000, defender.decision(genMatrix(player.x, player.y, enemy.x, enemy.y)), ctx);
	}
	else {
		defender.pushExample(genMatrix(player.x, player.y, enemy.x, enemy.y), keysToResult(keys.keys));
		enemy.update(delta / 1000, attacker.decision(genMatrix(player.x, player.y, enemy.x, enemy.y)), ctx);
	}

	if (player.update(delta / 1000, keys.getDirection(), {x: enemy.x, y: enemy.y}, ctx) != 0) return swap();
	time = new Date().getTime();
	requestAnimationFrame(update);
}

function swap() {
	if (attacking) {
		attacker.gradient();
	}
	else {
		defender.gradient();
	}
	attacking = !attacking;
	player.reset();
	enemy.reset();
	keys = new Keys();
	time = new Date().getTime();
	requestAnimationFrame(update);
}

function start() {
	player = new Player();
	keys = new Keys();
	enemy = new Enemy();
	menu.style.display = "none";
	time = new Date().getTime();
	canvas.style.display = "";
	document.getElementById("body").style = "background-color: black";
	document.addEventListener("keydown", down);
	document.addEventListener("keyup", up);
	requestAnimationFrame(update);
}

function end() {
	menu.style.display = "";
	canvas.style.display = "none";
	document.getElementById("body").style = "background-color: white";
	document.removeEventListener("keydown", down);
	document.removeEventListener("keyup", up);
}

document.getElementById("play").addEventListener("click", start);