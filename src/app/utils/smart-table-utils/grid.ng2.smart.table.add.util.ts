export class GridNg2SmartTableAddUtil {

  inputClass: string;
  addButtonContent: string;
  createButtonContent: string;
  cancelButtonContent: string;
  confirmCreate: boolean;

  constructor() {
    this.inputClass = '';
    this.addButtonContent = '<i class="nb-plus"></i>';
    this.createButtonContent = '<i class="nb-checkmark"></i>';
    this.cancelButtonContent = '<i class="nb-close"></i>';
    this.confirmCreate = false;
  }

  /**
   * setea la configuracion inicial
   *
   * @param config
   */
  setConfig(config: {
    inputClass?: string,
    addButtonContent?: string,
    createButtonContent?: string,
    cancelButtonContent?: string,
    confirmCreate?: boolean,
  }): void {
    this.inputClass = config.inputClass || this.inputClass;
    this.addButtonContent = config.addButtonContent || this.addButtonContent;
    this.createButtonContent = config.createButtonContent || this.createButtonContent;
    this.cancelButtonContent = config.cancelButtonContent || this.cancelButtonContent;
    this.confirmCreate = config.confirmCreate || this.confirmCreate;
  }

}
