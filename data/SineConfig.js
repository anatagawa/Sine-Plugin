var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SineConfig = (function (_super) {
    __extends(SineConfig, _super);
    function SineConfig(pub) {
        if (pub.mouvement == "")
            pub.mouvement = "angle";
        if (pub.periode == null)
            pub.periode = 2;
        if (pub.magnitude == null)
            pub.magnitude = 90;
        if (pub.wave == "")
            pub.wave = "sinus";
        _super.call(this, pub, SineConfig.schema);
    }
    SineConfig.create = function () {
        var emptyConfig = {
            mouvement: "angle",
            periode: 2,
            magnitude: 90,
            wave: "sinus"
        };
        return emptyConfig;
    };
    SineConfig.schema = {
        mouvement: { type: "enum", items: ["angle", "horizontal", "vertical", "opacity", "scale"], mutable: true },
        periode: { type: "number", min: 0, mutable: true },
        magnitude: { type: "number", min: 0, mutable: true },
        wave: { type: "enum", items: ["sinus", "triangle"], mutable: true }
    };
    return SineConfig;
})(SupCore.data.base.ComponentConfig);
exports.default = SineConfig;
