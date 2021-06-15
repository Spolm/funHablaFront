import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
// import {GridUtil} from '../entities/util/grid.util';
// import {ReportColumnUtil} from '../entities/util/report/report.column.util';
// import {CsvService, ExcelService, PdfService} from '../utils/exports';
// import {FileUtil} from '../utils/file.util';
// import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {NbDialogRef} from '@nebular/theme/components/dialog/dialog-ref';
import {GridNg2SmartTableConfigUtil} from '../../utils/smart-table-utils/grid.ng2.smart.table.config.util';
// import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class GridService {

  public config: GridNg2SmartTableConfigUtil;

  constructor(
    private oHttpService: HttpService,
    // public oLoginService: LoginService,
    // public oFileService: FileUtil,
    // public oCsvService: CsvService,
    // public oExcelService: ExcelService,
    // public oPdfService: PdfService,
    public oRouter: Router,
    // private oTranslateService: TranslateService,
  ) {
    this.newConfig();
    this.cleanGridComponent();
  }

  public newConfig(): GridNg2SmartTableConfigUtil {
    //this.config = new GridNg2SmartTableConfigUtil().setHttp(this.oHttpService);

    return this.config;
  }

  public postSelect: any = () => {
  }

  public postCreate: any = () => {
  }

  public postEdit: any = () => {
  }

  /**
   * http
   */
  //public http(): HttpService {
    //return this.oHttpService;
  //}

  /**
   * file
   */
  public setInit(): GridService {
    this.cleanGridComponent().config.setInit();

    return this;
  }

  /**
   * Limpia el componente
   */
  cleanGridComponent(): GridService {
    this.config.cleanGridComponent();
    //this.config.settings.actions.columnTitle = this.http().translate().instant('app.actions');
    //this.config.settings.noDataMessage = this.http().translate().instant('app.nodata');

    return this;
  }

  //translate(): TranslateService {
    //return this.oTranslateService;
  //}

  /**
   * crea una modal para agregar datos
   *
   * @param event
   * @param context
   */
  onSelect(event, context?: any): NbDialogRef<any> {
    if (this.http().object().isNotNull(this.config.components.view)) {
      context = context || {};
      context.title = 'app.view';
      context.model = event.data;
      this.config.components.viewConfig.context = context;
      this.config.components.viewConfig.hasScroll = true;

      return this.http().alert().dialog().open(this.config.components.view, this.config.components.viewConfig);
    } else if (this.config.components.viewUrl && this.config.components.viewUrl.trim().length > 0) {
      const path: string = event.data?.id ? '/' + event.data?.id : '';
      this.oRouter.navigateByUrl(this.config.components.viewUrl + path);
      return null;
    }
  }

  /**
   * crea una modal para agregar datos
   *
   * @param event
   * @param context
   */
  onCreate(event, context?: any): NbDialogRef<any> {
    if (this.http().object().isNotNull(this.config.components.update)) {
      context = context || {};
      context.title = 'app.new';
      context.model = new this.config.components.entity;
      this.config.components.updateConfig.context = context;

      return this.http().alert().dialog().open(this.config.components.update, this.config.components.updateConfig);
    } else if (this.config.components.updateUrl && this.config.components.updateUrl.trim().length > 0) {
      this.oRouter.navigateByUrl(this.config.components.updateUrl + '/0');
      return null;
    }
  }

  /**
   * crea una modal para editar o modificar datos
   *
   * @param event
   * @param context
   */
  onEdit(event, context?: any): NbDialogRef<any> {
    if (this.http().object().isNotNull(this.config.components.update)) {
      context = context || {};
      context.title = 'app.update';
      context.model = event.data;
      this.config.components.updateConfig.context = context;

      return this.http().alert().dialog().open(this.config.components.update, this.config.components.updateConfig);
    } else if (this.config.components.updateUrl && this.config.components.updateUrl.trim().length > 0) {
      const path: string = event.data?.id ? '/' + event.data?.id : '';
      this.oRouter.navigateByUrl(this.config.components.updateUrl + path);
      return null;
    }
  }

  /**
   * crea una modal de confirmacion para la eliminacion de registros
   *
   * @param event
   */
  onDelete(event): void {
    this.oHttpService.alert().openDialog({
      title: this.translate().instant('error.title.428'),
      message: this.translate().instant('app.confirm_delete'),
      acceptTitle: this.translate().instant('app.accept'),
      accept: () => {
        this.setDelete(event.data);
      },
      decline: () => {
      },
    });
  }

  /**
   * genera la informacion necesaria para construir el reporte
   *
   * @param event
   * @param type
   * @param name
   * @param online
   */
  onReport(event, type?: string, name?: string, online?: string) {
    const logo = 'assets/icons/icon-512x512.png';
    this.setColumnReport();
    this.config.reportData.name = this.http().translate()
      .instant(this.http().object().getDefault(name, this.config.reportData.name));

    this.config.source.getFilteredAndSorted().then((data) => {
      if (this.http().object().isNotNull(data) || data.length > 1) {
        this.config.reportData.data = data;
        this.config.reportData.type = type;

        if (online) {
          this.http().post(this.config.reportData, {
            path: this.config.uri.report,
            showSuccess: false,
          }).then((result) => {
            this.http().object().timeout(100).then(() => {
              this.oFileService.downloadFileFromBase64(result.base64);
            });
          });
        } else {
          switch (this.config.reportData.type) {
            case 'pdf':
              this.oPdfService.addImage(logo).then(o => {
                o.addReportUtil(this.config.reportData).getPDF().download(this.config.reportData.name + '.' + this.config.reportData.type);
              });
              break;
            case 'xls':
            case 'xlsx':
              this.oExcelService.addImage(logo, 'A1:B4').then(o => {
                o.addReportUtil(this.config.reportData, 'A5').generate(this.config.reportData.name);
              });
              break;
            case 'csv':
              this.oCsvService.addReportUtil(this.config.reportData).generate(this.config.reportData.name);
              break;
            default:
          }
        }
      } else {
        this.oHttpService.alert().openDialog({
          title: this.translate().instant('error.title.204'),
          message: 'No hay ninguna información',
        });
      }
    });
  }

  /**
   * realiza la obtencion de la data
   *
   * @param options
   */
  public get<T>(options?: { path?: string }): Promise<any> {
    options = this.http().object().getDefault(options, {});
    options.path = this.http().object().getDefault(options.path, this.config.uri.get);

    return new Promise<any>((resolve, reject) => {
      this.http().get<T>(null, {
        path: options.path,
      }).then(result => {
        this.config.data = result;

        this.http().object().timeout(100).then(() => {
          resolve(result);
          this.config.refreshSettings();
        });
      }, result => {
        this.http().object().timeout(100).then(() => {
          reject(result);
        });
      });
    });
  }

  /**
   * realiza la obtencion de la data
   *
   * @param options
   */
  public list<T>(options?: { path?: string }): Promise<any> {
    options = this.http().object().getDefault(options, {});
    options.path = this.http().object().getDefault(options.path, this.config.uri.get);

    return new Promise<any>((resolve, reject) => {
      const params = new URLSearchParams();
      let path = '';

      if (this.config.settings.pager.online) {
        params.set('perPage', this.config.settings.pager.perPage.toString());
        params.set('page', this.config.data.current_page.toString());
        this.config.dataFilter.forEach(r => {
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
        this.config.data = result;

        this.http().object().timeout(100).then(() => {
          resolve(result);
          this.config.refreshSettings();
          this.config.source.load(this.config.data.data).then(() => {
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
   * realiza la actualizacion de la data
   *
   * @param o
   * @param options
   */
  public saveOrUpdate(o: any, options?: { path?: string, noList?: boolean }): Promise<any> {
    options = this.http().object().getDefault(options, {});
    options.path = this.http().object().getDefault(options.path, this.config.uri.post);

    return new Promise<any>((resolve, reject) => {
      if (o?.id > 0) {
        this.http().put(o, {
          path: options.path,
        }).then(result => {
          if (!options.noList) {
            this.list().then(resolve).catch(reject);
          } else {
            resolve(result);
          }
        }).catch(reject);
      } else {
        this.http().post(o, {
          path: options.path,
        }).then(result => {
          if (!options.noList) {
            this.list().then(resolve).catch(reject);
          } else {
            resolve(result);
          }
        }).catch(reject);
      }
    });
  }

  /**
   * realiza la eliminacion de la data
   *
   * @param o
   * @param options
   */
  public setDelete(o: any, options?: { path?: string, success?: any }): Promise<any> {
    options = this.http().object().getDefault(options, {});
    options.path = this.http().object().getDefault(options.path, this.config.uri.delete);
    options.success = this.http().object().getDefault(options.success, () => {
    });

    return new Promise<any>((resolve, reject) => {
      this.http().delete(o, {
        path: options.path,
      }).then(result => {
        this.list().then(resolve, reject);
      });
    });
  }

  /**
   * setea las columnas por defecto del reporte
   */
  private setColumnReport() {
    const t = this;
    const settings: any = this.config.settings;

    if (this.config.reportData.columns.length < 1) {
      Object.keys(settings.columns).every(function (name) {
        const col = settings.columns[name];
        let add: boolean = true;

        if (t.http().object().isNotNull(col['exclude'])) {
          add = col['exclude'];
        }

        if (add) {
          const column: ReportColumnUtil = new ReportColumnUtil();
          column.title = col['title'];
          column.type = col['type'];
          column.valuePrepareFunction = col['valuePrepareFunction'];
          column.attribute = t.http().object().isNotNull(col['attribute']) ? col['attribute'] : name;

          t.config.reportData.columns.push(column);
        }

        return settings.columns[name];
      });
    }
  }

}
