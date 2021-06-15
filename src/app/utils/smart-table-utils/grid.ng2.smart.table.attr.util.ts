export class GridNg2SmartTableAttrUtil {

  id: string;
  class: string;

  constructor() {
    this.id = '';
    this.class = '';
  }

  /**
   * setea la configuracion inicial
   *
   * @param config
   */
  setConfig(config: { id?: string, class?: string }): void {
    this.id = config.id || this.id;
    this.class = config.class || this.class;
  }

}
