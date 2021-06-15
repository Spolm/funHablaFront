import {GridNg2SmartTableColumnsEditorConfigCompleterUtil} from './grid.ng2.smart.table.columns.editor.config.completer.util';

export class GridNg2SmartTableColumnsEditorConfigUtil {

  true: string;
  false: string;
  list: any[];
  completer: GridNg2SmartTableColumnsEditorConfigCompleterUtil;

  constructor() {
    this.true = '';
    this.false = '';
    this.list = [];
    this.completer = new GridNg2SmartTableColumnsEditorConfigCompleterUtil();
  }
}
