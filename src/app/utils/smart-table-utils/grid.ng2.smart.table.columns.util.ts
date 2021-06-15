import {GridNg2SmartTableColumnsEditorUtil} from './grid.ng2.smart.table.columns.editor.util';

export class GridNg2SmartTableColumnsUtil {

  title: string;
  class: string;
  width: string;
  editable: boolean;
  type: string;
  renderComponent: any;
  onComponentInitFunction: any;
  editor: GridNg2SmartTableColumnsEditorUtil;
  filter: any;
  valuePrepareFunction: any;
  sort: boolean;
  sortDirection: string;
  compareFunction: any;
  filterFunction: any;

  constructor() {
    this.title = '';
    this.class = '';
    this.width = '';
    this.editable = true;
    this.type = 'text';
    this.editor = new GridNg2SmartTableColumnsEditorUtil();
    this.sort = true;
    this.sortDirection = 'asc';
  }

}
