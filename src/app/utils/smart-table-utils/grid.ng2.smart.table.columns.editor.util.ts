import {GridNg2SmartTableColumnsEditorConfigUtil} from './grid.ng2.smart.table.columns.editor.config.util';

export class GridNg2SmartTableColumnsEditorUtil {

  type: string;
  config: GridNg2SmartTableColumnsEditorConfigUtil;

  constructor() {
    this.type = 'text';
    this.config = new GridNg2SmartTableColumnsEditorConfigUtil();
  }
}
