export default class SineEditor {

	projectClient: SupClient.ProjectClient;
	editConfig: any;

	fields: { [name: string]: HTMLInputElement|HTMLSelectElement } = {};

	mouvementSelectBox: HTMLSelectElement;
	waveSelectBox: HTMLSelectElement;
	periodeField: HTMLInputElement;
	magnitudeField: HTMLInputElement;

	constructor(tbody: HTMLTableSectionElement, config: any, projectClient: SupClient.ProjectClient, editConfig: any) {

		this.projectClient = projectClient;
		this.editConfig = editConfig;

		// Mouvement
		let mouvementRow = SupClient.table.appendRow(tbody, "Mouvement");
		this.mouvementSelectBox = SupClient.table.appendSelectBox(mouvementRow.valueCell, {
			"angle": "Angle",
			"horizontal": "Horizontal",
			"vertical": "Vertical",
			"opacity": "Opacity",
			"scale": "Scale"
		}, config.mouvement);
		this.mouvementSelectBox.addEventListener("change", (event: any) => {
			this.editConfig("setProperty", "mouvement", event.target.value);
		});

		// Wave
		let waveRow = SupClient.table.appendRow(tbody, "Wave");
		this.waveSelectBox = SupClient.table.appendSelectBox(waveRow.valueCell, {
			"sinus": "Sinus",
			"triangle": "Triangle"
		}, config.wave);
		this.waveSelectBox.addEventListener("change", (event: any) => {
			this.editConfig("setProperty", "wave", event.target.value);
		});

		// Periode
		let periodeRow = SupClient.table.appendRow(tbody, "Periode");
		this.periodeField = SupClient.table.appendNumberField(periodeRow.valueCell, config.periode, 0.01);
		this.periodeField.addEventListener("change", (event: any) => {
			this.editConfig("setProperty", "periode", parseFloat(event.target.value));
		});


		// Magnitude
		let magnitudeRow = SupClient.table.appendRow(tbody, "Magnitude");
		this.magnitudeField = SupClient.table.appendNumberField(magnitudeRow.valueCell, config.magnitude, 0.01);
		this.magnitudeField.addEventListener("change", (event: any) => {
			this.editConfig("setProperty", "magnitude", parseFloat(event.target.value));
		});
	}

	destroy() {}

	config_setProperty(path: string, value: any) {
		switch(path) {
			case "mouvement": this.mouvementSelectBox.value = value; break;
			case "wave": this.waveSelectBox.value = value; break;
			case "periode": this.periodeField.value = value; break;
			case "magnitude": this.magnitudeField.value = value; break;
		}
		//this.fields[path].value = value;
	}

	_onChangePeriode = (event: any) => { this.editConfig("setProperty", "periode", parseFloat(event.target.value)); }
	_onChangeMagnitude = (event: any) => { this.editConfig("setProperty", "magnitude", parseFloat(event.target.value)); }
}
