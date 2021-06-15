export class GridNg2SmartTableDeleteUtil {

  deleteButtonContent: string;
  confirmDelete: boolean;

  constructor() {
    this.deleteButtonContent = '<i class="nb-trash"></i>';
    this.confirmDelete = false;
  }

  /**
   * setea la configuracion inicial
   *
   * @param config
   */
  setConfig(config: {
    deleteButtonContent?: string,
    confirmDelete?: boolean,
  }): void {
    this.deleteButtonContent = config.deleteButtonContent || this.deleteButtonContent;
    this.confirmDelete = config.confirmDelete || this.confirmDelete;
  }

}
