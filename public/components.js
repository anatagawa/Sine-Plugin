(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Sine_1 = require("./Sine");
SupEngine.registerComponentClass("Sine", Sine_1.default);

},{"./Sine":2}],2:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var THREE = SupEngine.THREE;
var SineUpdater_1 = require("./SineUpdater");
var Sine = (function (_super) {
    __extends(Sine, _super);
    function Sine(actor, config) {
        _super.call(this, actor, "Sine");
        this.periode = 1;
        this.magnitude = 1;
        this.mouvement = "Horizontal";
        this.wave = "Sinus";
        this.i = 0;
        this.width = 0;
        this.height = 0;
        this.opacity = 1;
        this.initialValue = 0;
        this.lastKnownValue = 0;
        this.mag = 0;
        console.debug("Actor: " + this.actor.components[1].typeName);
    }
    Sine.prototype.toRadians = function (degrees) {
        return degrees * Math.PI / 180;
    };
    ;
    Sine.prototype.setup = function (config) {
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
    };
    Sine.prototype.clamp_angle = function (a) {
        a %= 2 * window.Math.PI;
        if (a < 0)
            a += 2 * window.Math.PI;
        return a;
    };
    Sine.prototype.waveFunc = function (x) {
        switch (this.wave) {
            case "sinus": {
                x = x % (2 * window.Math.PI);
                return window.Math.cos(x);
                break;
            }
            case "triangle": {
                if (x <= (window.Math.PI / 2))
                    return x / (window.Math.PI / 2);
                else if (x <= ((3 * window.Math.PI) / 2))
                    return 1 - (2 * (x - (window.Math.PI / 2)) / window.Math.PI);
                else
                    return (x - ((3 * window.Math.PI) / 2)) / (window.Math.PI / 2) - 1;
                break;
            }
        }
    };
    Sine.prototype.update = function () {
        this.actorPosition = this.actor.getLocalPosition();
        this.actorScale = this.actor.getLocalScale();
        this.i += (0.017 / this.periode) * (2 * window.Math.PI);
        this.i = this.i % (2 * window.Math.PI);
        switch (this.mouvement) {
            case "angle": {
                if (this.actorAngles.z !== this.lastKnownValue)
                    this.initialValue = this.clamp_angle(this.initialValue + (this.actorAngles.z - this.lastKnownValue));
                this.actorAngles.z = this.clamp_angle(this.initialValue + this.waveFunc(this.i) * this.toRadians(this.magnitude));
                this.lastKnownValue = this.actorAngles.z;
                this.actor.setGlobalEulerAngles(new THREE.Euler(0, 0, this.lastKnownValue));
                break;
            }
            case "horizontal": {
                if (this.actorPosition.x !== this.lastKnownValue)
                    this.initialValue += this.actorPosition.x - this.lastKnownValue;
                this.actorPosition.x = this.initialValue + this.waveFunc(this.i) * this.magnitude;
                this.lastKnownValue = this.actorPosition.x;
                this.actor.setGlobalPosition(new THREE.Vector3(this.lastKnownValue, this.actorPosition.y, this.actorPosition.z));
                break;
            }
            case "vertical": {
                if (this.actorPosition.y !== this.lastKnownValue)
                    this.initialValue += this.actorPosition.y - this.lastKnownValue;
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
                if (this.width < this.initialValue)
                    this.width = this.initialValue;
                this.height = this.width;
                this.actor.setLocalScale(new THREE.Vector3(this.width, this.height, 1));
                break;
            }
        }
    };
    Sine.prototype._destroy = function () {
        _super.prototype._destroy.call(this);
    };
    Sine.Updater = SineUpdater_1.default;
    return Sine;
})(SupEngine.ActorComponent);
exports.default = Sine;

},{"./SineUpdater":3}],3:[function(require,module,exports){
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

},{}]},{},[1]);
