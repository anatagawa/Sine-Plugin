(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

SupAPI.registerPlugin("typescript", "Sine", {
    code: "module Sup {\n  export class Sine extends ActorComponent {\n    constructor( actor, options ) {\n      super( actor );\n      this.__inner = new SupEngine.componentClasses.Sine( actor.__inner, options );\n      this.__inner.__outer = this;\n      this.actor.sine = this;\n    }\n    destroy() {\n      this.actor.sine = null;\n      super.destroy();\n    }\n  }\n}\n",
    defs: "declare module Sup {\n  class Sine extends ActorComponent {\n    constructor( actor: Sup.Actor, options?: any );\n  }\n}\n",
    exposeActorComponent: { propertyName: "sine", className: "Sup.Sine" }
});

},{}]},{},[1]);
