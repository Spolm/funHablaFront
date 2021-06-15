import {GridUtil} from '../grid.util';
import {LocalDataSource} from 'ng2-smart-table';
import {GridNg2SmartTableUtil} from './grid.ng2.smart.table.util';
import {ReportUtil} from '../report.util';
import {EntityUtil} from '../entity.util';
import {
  GridFilterCheckboxComponent,
  GridFilterDateComponent,
  GridFilterDaterangeComponent,
  GridFilterInputComponent,
  GridFilterInputnumberComponent,
  GridFilterNoneComponent,
  GridFilterSelectComponent,
  GridFilterSelectmultipleComponent,
} from '../../../components';
import {DatePipe} from '@angular/common';
import {HttpService} from '../../../services';

export class GridNg2SmartTableConfigUtil {

  data: GridUtil;
  source: LocalDataSource;
  settings: GridNg2SmartTableUtil;
  reportData: ReportUtil;
  canReport: boolean;
  dataFilter: { field: string, attribute: string, value: string }[] = [];
  components: {
    entity: any,
    update: any,
    updateUrl: any,
    view: any,
    viewUrl: string,
    viewConfig: {
      autoFocus?: boolean,
      backdropClass?: string,
      closeOnBackdropClick?: boolean,
      closeOnEsc?: boolean,
      dialogClass?: string,
      hasBackdrop?: boolean,
      hasScroll?: boolean,
      context?: any,
    },
    updateConfig: {
      autoFocus?: boolean,
      backdropClass?: string,
      closeOnBackdropClick?: boolean,
      closeOnEsc?: boolean,
      dialogClass?: string,
      hasBackdrop?: boolean,
      hasScroll?: boolean,
      context?: any,
    },
  };
  uri: { get: string, post: string, put: string, delete: string, report: string };
  private isInit = true;
  private oHttpService: HttpService;

  constructor() {
    this.canReport = false;
    this.data = new GridUtil();
    this.source = new LocalDataSource(this.data.data);
    this.settings = new GridNg2SmartTableUtil();
    this.reportData = new ReportUtil();
    this.components = {
      entity: EntityUtil,
      update: null,
      updateUrl: '',
      updateConfig: {
        autoFocus: true,
        backdropClass: 'backdropNebular',
        closeOnBackdropClick: true,
        closeOnEsc: true,
        dialogClass: 'modalNebular',
        hasBackdrop: true,
        hasScroll: false,
      },
      view: null,
      viewUrl: '',
      viewConfig: {
        autoFocus: true,
        backdropClass: 'backdropNebular',
        closeOnBackdropClick: true,
        closeOnEsc: true,
        dialogClass: 'modalNebular',
        hasBackdrop: true,
        hasScroll: false,
      },
    };
    this.uri = {
      get: '',
      post: '',
      put: '',
      delete: '',
      report: '',
    };
  }

  /**
   * http
   */
  public http(): HttpService {
    return this.oHttpService;
  }

  /**
   * setea el componente http
   *
   * @param oHttpService
   */
  setHttp(oHttpService: HttpService): GridNg2SmartTableConfigUtil {
    this.oHttpService = oHttpService;

    return this;
  }

  /**
   * inicializa todo el componente
   */
  public setInit(): void {
    this.source = new LocalDataSource(this.data.data);
    this.uri.post = this.uri.post || this.uri.get;
    this.uri.put = this.uri.put || this.uri.get;
    this.uri.delete = this.uri.delete || this.uri.get;
    this.uri.report = this.uri.report || this.uri.post + '/report';

    if (this.components.view !== null || (this.components.viewUrl && this.components.viewUrl.trim().length > 0)) {
      this.settings.attr.class = 'smart-table-has-view';
    }

    if (!this.components.update && !this.components.updateUrl) {
      this.settings.mode = 'inline';
    }
  }

  /**
   * setea la configuracion de los componentes
   *
   * @param config
   */
  setComponents(config: {
    entity?: any,
    update?: any,
    updateUrl?: any,
    updateConfig?: {
      autoFocus?: boolean,
      backdropClass?: string,
      closeOnBackdropClick?: boolean,
      closeOnEsc?: boolean,
      dialogClass?: string,
      hasBackdrop?: boolean,
      hasScroll?: boolean,
      context?: any,
    },
    view?: any,
    viewUrl?: string,
    viewConfig?: {
      autoFocus?: boolean,
      backdropClass?: string,
      closeOnBackdropClick?: boolean,
      closeOnEsc?: boolean,
      dialogClass?: string,
      hasBackdrop?: boolean,
      hasScroll?: boolean,
      context?: any,
    },
  }): GridNg2SmartTableConfigUtil {
    const confInit = {
      autoFocus: true,
      backdropClass: 'backdropNebular',
      closeOnBackdropClick: true,
      closeOnEsc: true,
      dialogClass: 'modalNebular',
      hasBackdrop: true,
      hasScroll: false,
    };
    this.components.entity = config.entity || this.components.entity;
    this.components.update = config.update || this.components.update;
    this.components.updateUrl = config.updateUrl || this.components.updateUrl;
    this.components.view = config.view || this.components.view;
    this.components.viewUrl = config.viewUrl || this.components.viewUrl;
    this.components.viewConfig = confInit;
    this.components.updateConfig = confInit;

    this.components.viewConfig.autoFocus = config.updateConfig?.autoFocus || this.components.viewConfig.autoFocus;
    this.components.viewConfig.backdropClass = config.updateConfig?.backdropClass || this.components.viewConfig.backdropClass;
    this.components.viewConfig.closeOnBackdropClick = config.updateConfig?.closeOnBackdropClick ||
      this.components.viewConfig.closeOnBackdropClick;
    this.components.viewConfig.closeOnEsc = config.updateConfig?.closeOnEsc || this.components.viewConfig.closeOnEsc;
    this.components.viewConfig.dialogClass = config.updateConfig?.dialogClass || this.components.viewConfig.dialogClass;
    this.components.viewConfig.hasBackdrop = config.updateConfig?.hasBackdrop || this.components.viewConfig.hasBackdrop;
    this.components.viewConfig.hasScroll = config.updateConfig?.hasScroll || this.components.viewConfig.hasScroll;

    this.components.updateConfig.autoFocus = config.updateConfig?.autoFocus || this.components.updateConfig.autoFocus;
    this.components.updateConfig.backdropClass = config.updateConfig?.backdropClass || this.components.updateConfig.backdropClass;
    this.components.updateConfig.closeOnBackdropClick = config.updateConfig?.closeOnBackdropClick ||
      this.components.updateConfig.closeOnBackdropClick;
    this.components.updateConfig.closeOnEsc = config.updateConfig?.closeOnEsc || this.components.updateConfig.closeOnEsc;
    this.components.updateConfig.dialogClass = config.updateConfig?.dialogClass || this.components.updateConfig.dialogClass;
    this.components.updateConfig.hasBackdrop = config.updateConfig?.hasBackdrop || this.components.updateConfig.hasBackdrop;
    this.components.updateConfig.hasScroll = config.updateConfig?.hasScroll || this.components.updateConfig.hasScroll;

    return this;
  }

  /**
   * setea la configuracion de los componentes
   *
   * @param config
   */
  setUris(config: { get: string, post?: string, put?: string, delete?: string, report?: string }): GridNg2SmartTableConfigUtil {
    this.uri.get = config.get || this.uri.get;
    this.uri.post = config.post || this.uri.post;
    this.uri.put = config.put || this.uri.put;
    this.uri.delete = config.delete || this.uri.delete;
    this.uri.report = config.report || this.uri.report;

    this.setInit();

    return this;
  }

  /**
   * Limpia el componente
   */
  cleanGridComponent() {
    this.data = new GridUtil();
    this.source.empty().then(() => {
    });
  }

  /**
   * refresca la tabla y sus atributos
   */
  refreshSettings(): void {
    const t = this;
    const settings: any = this.settings;

    if (this.isInit) {
      if (this.oHttpService.object().isNotNull(settings.columns)) {
        Object.keys(settings.columns).every((name) => {
          let column = settings.columns[name];
          const attribute = t.oHttpService.object().getDefault(column.attribute, name);
          column.title = t.oHttpService.translate().instant(column.title);

          switch (column.type) {
            case 'list-multiple':
            // column = t.getListMultiple(column, attribute);
            // break;
            case 'list':
              column = t.getList(column, attribute);
              break;
            case 'date':
              column = t.getDate(column, attribute);
              break;
            case 'date-range':
              column = t.getDateRange(column, attribute);
              break;
            case 'boolean':
            case 'checkbox':
              column = t.getCheckbox(column, attribute);
              break;
            case 'none':
            case 'html':
              column = t.getNone(column, attribute);
              break;
            case 'number':
              column = t.getInputNumber(column, attribute);
              break;
            case 'custom':
              break;
            default:
              column = t.getInput(column, attribute);
          }

          settings.columns[name] = column;
          return t.settings.columns[name];
        });
      }

      this.source.load(this.data.data).then(() => {
        this.isInit = false;
      });
      this.oHttpService.object().timeout(100).then(() => this.settings = Object.assign({}, settings));
    }
  }

  /**
   * realiza la obtencion de la data
   *
   * @param options
   */
  public list<T>(options?: { path?: string }): Promise<any> {
    options = this.http().object().getDefault(options, {});
    options.path = this.http().object().getDefault(options.path, this.uri.get);

    return new Promise<any>((resolve, reject) => {
      const params = new URLSearchParams();
      let path = '';

      if (this.settings.pager.online) {
        params.set('perPage', this.settings.pager.perPage.toString());
        params.set('page', this.data.current_page.toString());
        this.dataFilter.forEach(r => {
          if (r.value && r.value !== '') {
            params.set(r.attribute, r.value);
          }
        });
        path += '?' + params.toString();
      }

      this.http().get<T>(new GridUtil().setMaxLength(), {
        path: options.path + path,
        entity: GridUtil,
        showSuccess: false,
      }).then((result: GridUtil) => {
        this.data = result;

        this.http().object().timeout(100).then(() => {
          resolve(result);
          this.refreshSettings();
          this.source.load(this.data.data).then(() => {
          });
        });
      }, result => {
        this.http().object().timeout(100).then(() => {
          reject(result);
        });
      });
    });
  }

  /**
   * deja el filtro en blanco
   *
   * @param column
   * @param attribute
   */
  private getNone(column: string, attribute: string): any {
    column['renderComponent'] = GridFilterNoneComponent;
    column['filterFunction'] = (): boolean => {
      return true;
    };

    column['filter'] = {
      component: GridFilterNoneComponent,
      type: 'custom',
    };

    return column;
  }

  /**
   * coloca un filtro de campo tipo numerico
   *
   * @param column
   * @param attribute
   */
  private getInputNumber(column: string, attribute: string): any {
    const title = column;

    column['renderComponent'] = GridFilterInputnumberComponent;
    column['filterFunction'] = (cell?: any, search?: any): boolean => {
      let value = cell;

      if (attribute.indexOf('.') > -1) {
        value = this.oHttpService.object().getChildRecursive(cell, attribute.split('.').slice(1, attribute.split('.').length).join('.'));
      }
      this.setFilter(title, attribute, search);

      if (this.settings.pager.online) {
        return true;
      }

      return (search === value.toString() || search === '');
    };
    column['filter'] = {
      component: GridFilterInputnumberComponent,
      type: 'custom',
    };

    return column;
  }

  /**
   * coloca un filtro de campo tipo texto
   *
   * @param column
   * @param attribute
   */
  private getInput(column: string, attribute: string): any {
    const title = column;

    column['renderComponent'] = GridFilterInputComponent;
    column['filterFunction'] = (cell?: any, search?: any): boolean => {
      let value = cell;

      if (attribute.indexOf('.') > -1) {
        value = this.oHttpService.object().getChildRecursive(cell, attribute.split('.').slice(1, attribute.split('.').length).join('.'));
      }
      this.setFilter(title, attribute, search);

      if (this.settings.pager.online) {
        return true;
      }

      return (value.toLowerCase().indexOf(search.toLowerCase()) > -1 || search === '');
    };

    column['filter'] = {
      component: GridFilterInputComponent,
      type: 'custom',
    };

    return column;
  }

  /**
   * coloca un filtro de tipo fecha
   *
   * @param column
   * @param attribute
   */
  private getDate(column: string, attribute: string): any {
    const title = column;

    column['renderComponent'] = GridFilterDateComponent;
    column['filterFunction'] = (cell?: any, search?: any): boolean => {
      let value = cell;

      if (attribute.indexOf('.') > -1) {
        value = this.oHttpService.object().getChildRecursive(cell, attribute.split('.').slice(1, attribute.split('.').length).join('.'));
      }
      this.setFilter(title, attribute, search);

      if (this.settings.pager.online) {
        return true;
      }

      value = this.oHttpService.object().isNotType(value, ['object', 'number']) ? new Date(value).getTime() : value;
      const init: number = Number(search);
      const end: number = init + 86399999;

      return ((value >= init && value <= end) || search === '');
    };

    column['filter'] = {
      component: GridFilterDateComponent,
      type: 'custom',
    };

    return column;
  }

  /**
   * coloca un filtro de rango de fechas
   *
   * @param column
   * @param attribute
   */
  private getDateRange(column: string, attribute: string): any {
    const title = column;

    column['renderComponent'] = GridFilterDaterangeComponent;
    column['filterFunction'] = (cell?: any, search?: any): boolean => {
      let value = cell;

      if (attribute.indexOf('.') > -1) {
        value = this.oHttpService.object().getChildRecursive(cell, attribute.split('.').slice(1, attribute.split('.').length).join('.'));
      }
      this.setFilter(title, attribute, search.replace(/-/g, '->'));

      if (this.settings.pager.online) {
        return true;
      }

      value = this.oHttpService.object().isNotType(value, ['object', 'number']) ? new Date(value).getTime() : value;
      const searchSplit = search.split('-');
      const init: number = Number(searchSplit[0]);
      const end: number = Number(searchSplit[1]);

      return ((value >= init && value <= end) || search === '');
    };

    column['filter'] = {
      component: GridFilterDaterangeComponent,
      type: 'custom',
    };

    column['valuePrepareFunction'] = (cell, row) =>
      new DatePipe('en-US').transform(cell, 'MM/dd/yy hh:mm a', 'UTC');

    return column;
  }

  /**
   * coloca un filtro de seleccion booleana
   *
   * @param column
   * @param attribute
   */
  private getCheckbox(column: any, attribute: string): any {
    const title = column;

    column['renderComponent'] = GridFilterCheckboxComponent;
    column['filterFunction'] = (cell?: any, search?: any): boolean => {
      let value = cell;

      if (attribute.indexOf('.') > -1) {
        value = this.oHttpService.object().getChildRecursive(cell, attribute.split('.').slice(1, attribute.split('.').length).join('.'));
      }

      value = value.toString().toLowerCase();

      if (value === '1' || value === 1) {
        value = 'true';
      }

      if (value === '0' || value === 0) {
        value = 'false';
      }
      this.setFilter(title, attribute, search);

      if (this.settings.pager.online) {
        return true;
      }

      return (value.indexOf(search.toLowerCase()) > -1 || search === '');
    };

    column['filter'] = {
      component: GridFilterCheckboxComponent,
      type: 'custom',
    };

    if (this.oHttpService.object().isNotNull(column['translate'])) {
      column['valuePrepareFunction'] = (cell: any, row: any) => {
        return this.oHttpService.translate().instant('app.' + cell);
      };
    }

    return column;
  }

  /**
   * coloca un filtro de tipo lista
   *
   * @param column
   * @param attribute
   */
  private getList(column: string, attribute: string): any {
    const l: string[] = [];
    const title = column;

    column['renderComponent'] = GridFilterSelectComponent;
    column['filterFunction'] = (cell?: any, search?: any): boolean => {
      let value = cell;
      if (attribute.indexOf('.') > -1) {
        value = this.oHttpService.object().getChildRecursive(cell, attribute.split('.').slice(1, attribute.split('.').length).join('.'));
      }
      search = search === '**' || search === 'N/A' ? '' : search;
      this.setFilter(title, attribute, search);

      if (this.settings.pager.online) {
        return true;
      }

      return (value === search || search === '');
    };
    column['filter'] = {
      component: GridFilterSelectComponent,
      type: 'custom',
      config: {
        selectText: 'Seleccione',
        list: [],
      },
    };

    if (this.oHttpService.object().isNotType(this.data.data, ['string', 'number'])) {
      for (const d of this.data.data) {
        let value = this.oHttpService.object().getChildRecursive(d, attribute) || 'N/A';
        value = value === '' || value === 'N/A' || value === 'n/a' ? 'N/A' : value;

        if (value && l.indexOf(value) === -1) {
          column['filter']['config'].list.push(
            {value: value, title: value},
          );

          l.push(value);
        }
      }
    }

    return column;
  }

  /**
   * coloca un filtro de tipo lista multiple
   *
   * @param column
   * @param attribute
   */
  private getListMultiple(column: string, attribute: string): any {
    const l: string[] = [];
    const title = column;

    column['renderComponent'] = GridFilterSelectmultipleComponent;
    column['filterFunction'] = (cell?: any, search?: any): boolean => {
      let value = cell;
      if (attribute.indexOf('.') > -1) {
        value = this.oHttpService.object().getChildRecursive(cell, attribute.split('.').slice(1, attribute.split('.').length).join('.'));
      }
      this.setFilter(title, attribute, search);

      if (this.settings.pager.online) {
        return true;
      }

      return (value === search || search === '' ||
        (typeof (search) !== 'string' && typeof (search) !== 'number' && search.indexOf(value) > -1));
    };
    column['filter'] = {
      component: GridFilterSelectmultipleComponent,
      type: 'custom',
      config: {
        selectText: 'Seleccione',
        list: [],
      },
    };

    if (this.oHttpService.object().isNotType(this.data.data, ['string', 'number'])) {
      for (const d of this.data.data) {
        let value = this.oHttpService.object().getChildRecursive(d, attribute) || 'N/A';
        value = value === '' || value === 'N/A' || value === 'n/a' ? 'N/A' : value;

        if (value && l.indexOf(value) === -1) {
          column['filter']['config'].list.push(
            {value: value, title: value},
          );

          l.push(value);
        }
      }
    }

    return column;
  }

  /**
   * indica los filtros a usar para asi manejarlos en el get
   *
   * @param field
   * @param attribute
   * @param search
   * @private
   */
  private setFilter(field: string, attribute: string, search: string) {
    attribute = attribute.replace(/-/g, '_').replace(/\./g, '-').replace(/\[.*\]/g, '');
    const i = this.dataFilter.findIndex(r => r.attribute === attribute);
    let change = false;
    const emptyArr: any = ['**'];
    search = search !== '**' && search !== emptyArr ? search : '';

    if (i > -1) {
      if (this.dataFilter[i].value !== search) {
        change = true;
        this.dataFilter[i] = {field, attribute, value: search};
      }
    } else {
      change = true;
      this.dataFilter.push({field, attribute, value: search});
    }

    if (this.settings.pager.online && change) {
      this.list();
    }
  }

}
