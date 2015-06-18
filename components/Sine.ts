let THREE = SupEngine.THREE;

import SineConfig from "../data/SineConfig";
import SineUpdater from "./SineUpdater";

export default class Sine extends SupEngine.ActorComponent {
	static Updater = SineUpdater;
	periode: number = 1;
	magnitude: number = 1;
	mouvement: string = "Horizontal";
	wave: string = "Sinus";

	actorPosition: THREE.Vector3;
	actorAngles: THREE.Euler;
	actorScale: THREE.Vector3;

	i: number = 0;
	width: number = 0;
	height: number = 0;
	opacity: number = 1;
	initialValue: number = 0;
	lastKnownValue: number = 0;
	mag: number = 0;


	constructor(actor: SupEngine.Actor, config: any) {
		super(actor, "Sine");
		console.debug(`Actor: ${this.actor.components[1].typeName}`);
	}

	toRadians(degrees: number) {
		return degrees * Math.PI / 180;
	};

	setup(config: any) {
		this.periode = config.periode;
		this.magnitude = config.magnitude;

		this.actorPosition = this.actor.getLocalPosition();
		this.actorAngles = this.actor.getLocalEulerAngles();
		this.actorScale = this.actor.getLocalScale();

		this.mouvement = config.mouvement;
		this.wave = config.wave;

		switch (this.mouvement) {
			case "angle": {
				this.initialValue = this.actorAngles.z;
				break;
			}
			case "horizontal": {
				this.initialValue = this.actorPosition.x;
				break;
			}
			case "vertical": {
				this.initialValue = this.actorPosition.y;
				break;
			}
			case "opacity": {
				//this.initialValue = this.actor.components["SpriteRenderer"].getOpacity();
				break;
			}
			case "scale": {
				this.width = this.actorScale.x;
				this.height = this.actorScale.y;
				this.initialValue = this.width;
				break;
			}
		}
	}

	clamp_angle(a: number) : number {
		a %= 2 * (<any>window).Math.PI;
		if (a < 0) a += 2 * (<any>window).Math.PI;
		return a;
	}

	waveFunc(x: number) : number {
		switch (this.wave) {
			case "sinus": {
				x = x % (2 * (<any>window).Math.PI);
				return (<any>window).Math.cos(x);
				break;
			}
			case "triangle": {
				if (x <= ((<any>window).Math.PI / 2)) return x / ((<any>window).Math.PI / 2);
				else if (x <= ((3 * (<any>window).Math.PI) / 2)) return 1 - (2 * (x - ((<any>window).Math.PI / 2)) / (<any>window).Math.PI);
				else return (x - ((3 * (<any>window).Math.PI) / 2)) / ((<any>window).Math.PI / 2) - 1;
				break;
			}
		}
	}

	update() {

		this.actorPosition = this.actor.getLocalPosition();
		this.actorScale = this.actor.getLocalScale();

		this.i += (0.017 / this.periode) * ( 2 * (<any>window).Math.PI);
		this.i = this.i % (2 * (<any>window).Math.PI);

		switch(this.mouvement) {
			case "angle": {
				if(this.actorAngles.z !== this.lastKnownValue) this.initialValue = this.clamp_angle(this.initialValue + (this.actorAngles.z - this.lastKnownValue));
				this.actorAngles.z = this.clamp_angle(this.initialValue + this.waveFunc(this.i) * this.toRadians(this.magnitude));
				this.lastKnownValue = this.actorAngles.z;
				this.actor.setGlobalEulerAngles(new THREE.Euler(0,0,this.lastKnownValue));
				break;
			}
			case "horizontal": {
				if (this.actorPosition.x !== this.lastKnownValue) this.initialValue += this.actorPosition.x - this.lastKnownValue;
				this.actorPosition.x = this.initialValue + this.waveFunc(this.i) * this.magnitude;
				this.lastKnownValue = this.actorPosition.x;
				this.actor.setGlobalPosition(new THREE.Vector3(this.lastKnownValue, this.actorPosition.y, this.actorPosition.z));
				break;
			}
			case "vertical": {
				if (this.actorPosition.y !== this.lastKnownValue) this.initialValue += this.actorPosition.y - this.lastKnownValue;
				this.actorPosition.y = this.initialValue + this.waveFunc(this.i) * this.magnitude;
				this.lastKnownValue = this.actorPosition.y;
				this.actor.setGlobalPosition(new THREE.Vector3(this.actorPosition.x, this.lastKnownValue, this.actorPosition.z));
				break;
			}

			case "opacity": {
				//this.opacity = this.initialValue + (this.waveFunc(this.i) * this.magnitude) / 100.0;
				//if(this.opacity <= 0.0) this.opacity = 0.0;
				//else if(this.opacity >= 1.0) this.opacity = 1.0;
				break;
			}

			case "scale": {
				this.width = (this.waveFunc(this.i) * this.magnitude);
				if(this.width < this.initialValue) this.width = this.initialValue;
				this.height = this.width;
				this.actor.setLocalScale(new THREE.Vector3(this.width, this.height, 1));
				break;
			}
		}
	}

	_destroy() {
		super._destroy();
	}
}
