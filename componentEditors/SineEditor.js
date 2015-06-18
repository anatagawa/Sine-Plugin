var SineEditor = (function () {
    function SineEditor(tbody, config, projectClient, editConfig) {
        var _this = this;
        this.fields = {};
        this._onChangePeriode = function (event) { _this.editConfig("setProperty", "periode", parseFloat(event.target.value)); };
        this._onChangeMagnitude = function (event) { _this.editConfig("setProperty", "magnitude", parseFloat(event.target.value)); };
        this.projectClient = projectClient;
        this.editConfig = editConfig;
        // Mouvement
        var mouvementRow = SupClient.table.appendRow(tbody, "Mouvement");
        this.mouvementSelectBox = SupClient.table.appendSelectBox(mouvementRow.valueCell, {
            "angle": "Angle",
            "horizontal": "Horizontal",
            "vertical": "Vertical",
            "opacity": "Opacity",
            "scale": "Scale"
        }, config.mouvement);
        this.mouvementSelectBox.addEventListener("change", function (event) {
            _this.editConfig("setProperty", "mouvement", event.target.value);
        });
        // Wave
        var waveRow = SupClient.table.appendRow(tbody, "Wave");
        this.waveSelectBox = SupClient.table.appendSelectBox(waveRow.valueCell, {
            "sinus": "Sinus",
            "triangle": "Triangle"
        }, config.wave);
        this.waveSelectBox.addEventListener("change", function (event) {
            _this.editConfig("setProperty", "wave", event.target.value);
        });
        // Periode
        var periodeRow = SupClient.table.appendRow(tbody, "Periode");
        this.periodeField = SupClient.table.appendNumberField(periodeRow.valueCell, config.periode, 0.01);
        this.periodeField.addEventListener("change", function (event) {
            _this.editConfig("setProperty", "periode", parseFloat(event.target.value));
        });
        // Magnitude
        var magnitudeRow = SupClient.table.appendRow(tbody, "Magnitude");
        this.magnitudeField = SupClient.table.appendNumberField(magnitudeRow.valueCell, config.magnitude, 0.01);
        this.magnitudeField.addEventListener("change", function (event) {
            _this.editConfig("setProperty", "magnitude", parseFloat(event.target.value));
        });
    }
    SineEditor.prototype.destroy = function () { };
    SineEditor.prototype.config_setProperty = function (path, value) {
        switch (path) {
            case "mouvement":
                this.mouvementSelectBox.value = value;
                break;
            case "wave":
                this.waveSelectBox.value = value;
                break;
            case "periode":
                this.periodeField.value = value;
                break;
            case "magnitude":
                this.magnitudeField.value = value;
                break;
        }
        //this.fields[path].value = value;
    };
    return SineEditor;
})();
exports.default = SineEditor;
