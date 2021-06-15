export class GridNg2SmartTableActionsUtil {

  columnTitle: string;
  add: boolean;
  edit: boolean;
  delete: boolean;
  position: string;

  constructor() {
    this.columnTitle = 'Acciones';
    this.add = true;
    this.edit = true;
    this.delete = true;
    this.position = 'right';
  }

  /**
   * setea la configuracion inicial
   *
   * @param config
   */
  setConfig(config: { columnTitle?: string, add?: boolean, edit?: boolean, delete?: boolean, position?: string }): void {
    this.columnTitle = config.columnTitle || this.columnTitle;
    this.add = config.add || this.add;
    this.edit = config.edit || this.edit;
    this.delete = config.delete || this.delete;
    this.position = config.position || this.position;
  }

}
