export class GridNg2SmartTableEditUtil {

  inputClass: string;
  editButtonContent: string;
  saveButtonContent: string;
  cancelButtonContent: string;
  confirmSave: boolean;

  constructor() {
    this.inputClass = '';
    this.editButtonContent = '<img src="../../../../assets/images/editar.svg"/>';
    this.saveButtonContent = '<i class="nb-checkmark"></i>';
    this.cancelButtonContent = '<i class="nb-close"></i>';
    this.confirmSave = false;
  }

  /**
   * setea la configuracion inicial
   *
   * @param config
   */
  setConfig(config: {
    inputClass?: string,
    editButtonContent?: string,
    saveButtonContent?: string,
    cancelButtonContent?: string,
    confirmSave?: boolean,
  }): void {
    this.inputClass = config.inputClass || this.inputClass;
    this.editButtonContent = config.editButtonContent || this.editButtonContent;
    this.saveButtonContent = config.saveButtonContent || this.saveButtonContent;
    this.cancelButtonContent = config.cancelButtonContent || this.cancelButtonContent;
    this.confirmSave = config.confirmSave || this.confirmSave;
  }

}
