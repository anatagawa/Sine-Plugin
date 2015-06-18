(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var SineConfig_1 = require("./SineConfig");
SupCore.data.registerComponentConfigClass("Sine", SineConfig_1.default);

},{"./SineConfig":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
