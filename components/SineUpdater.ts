import { SineConfigPub } from "../data/SineConfig";
import Sine from "./Sine";

export default class SineUpdater {
  config: SineConfigPub;
  Sine: Sine;

  constructor(client: any, Sine: Sine,config: SineConfigPub) {
    this.config = config;
    this.Sine = Sine;
    this.Sine.periode = this.config.periode;
    this.Sine.magnitude = this.config.magnitude;
    this.Sine.mouvement = this.config.mouvement;
    this.Sine.wave = this.config.wave;
    this.Sine.setup(config);
  }

  destroy() {}

  config_setProperty(path: string, value: any) {
      switch(path) {
          case "mouvement": this.Sine.mouvement = value; break;
          case "wave": this.Sine.wave = value; break;
          case "periode": this.Sine.periode = value; break;
          case "magnitude": this.Sine.magnitude = value; break;
      }
  }
}
