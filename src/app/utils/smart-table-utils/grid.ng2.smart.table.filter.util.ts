export class GridNg2SmartTableFilterUtil {

  inputClass: string;

  constructor() {
    this.inputClass = '';
  }

  /**
   * setea la configuracion inicial
   *
   * @param config
   */
  setConfig(config: { inputClass?: string }): void {
    this.inputClass = config.inputClass || this.inputClass;
  }

}
