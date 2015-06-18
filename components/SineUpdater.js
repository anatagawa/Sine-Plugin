var SineUpdater = (function () {
    function SineUpdater(client, Sine, config) {
        this.config = config;
        this.Sine = Sine;
        this.Sine.periode = this.config.periode;
        this.Sine.magnitude = this.config.magnitude;
        this.Sine.mouvement = this.config.mouvement;
        this.Sine.wave = this.config.wave;
        this.Sine.setup(config);
    }
    SineUpdater.prototype.destroy = function () { };
    SineUpdater.prototype.config_setProperty = function (path, value) {
        switch (path) {
            case "mouvement":
                this.Sine.mouvement = value;
                break;
            case "wave":
                this.Sine.wave = value;
                break;
            case "periode":
                this.Sine.periode = value;
                break;
            case "magnitude":
                this.Sine.magnitude = value;
                break;
        }
    };
    return SineUpdater;
})();
exports.default = SineUpdater;
