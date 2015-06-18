export interface SineConfigPub {
	mouvement: string;
	periode: number;
	magnitude: number;
	wave: string;
}

export default class SineConfig extends SupCore.data.base.ComponentConfig {

	static schema = {
		mouvement:	{ type: "enum", items: ["angle","horizontal","vertical","opacity","scale"], mutable: true},
		periode:	{ type: "number", min: 0, mutable: true },
		magnitude:	{ type: "number", min: 0, mutable: true },
		wave:		{ type: "enum", items: ["sinus", "triangle"], mutable: true }
	}

	static create() {
		let emptyConfig: SineConfigPub = {
			mouvement:	"angle",
			periode:	2,
			magnitude:	90,
			wave:		"sinus"
		};

		return emptyConfig;
	}

	pub: SineConfigPub;

	constructor(pub: SineConfigPub) {
		if(pub.mouvement == "") pub.mouvement = "angle";
		if(pub.periode == null) pub.periode = 2;
		if(pub.magnitude == null) pub.magnitude = 90;
		if(pub.wave == "") pub.wave = "sinus";

		super(pub, SineConfig.schema);
	}
}
