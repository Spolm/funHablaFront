export class GridNg2SmartTablePagerUtil {

  online: boolean;
  display: boolean;
  perPage: number;

  constructor() {
    this.online = false;
    this.display = true;
    this.perPage = 10;
  }

  /**
   * setea la configuracion inicial
   *
   * @param config
   */
  setConfig(config: {
    online?: boolean,
    display?: boolean,
    perPage?: number,
  }): void {
    this.online = config.online || this.online;
    this.display = config.display || this.display;
    this.perPage = config.perPage || this.perPage;
  }

}
