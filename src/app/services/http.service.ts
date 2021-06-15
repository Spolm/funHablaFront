import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {NgxSoapService} from 'ngx-soap';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {map} from 'rxjs/operators';
import {AlertUtil} from '../utils/alert.util';
import {LoadingUtil} from '../utils/loading.util';
import {ObjectUtil} from '../utils/object.util';
import {StorageUtil} from '../utils/storage.util';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  public assignments: any[] = [];
  public currentMessage: BehaviorSubject<any> = new BehaviorSubject(null);
  public tokenFirebase: string;
  public stgAuthJwt: string = 'Authorization';
  public stgAuthSession: string = 'X-Auth-Session';
  public stgAuthOrganization: string = 'X-Auth-Organization';
  public stgMenuBar: string = 'X-Menu-Bar';
  public stgMenuSidebar: string = 'X-Menu-Sidebar';

  constructor(
    private oAlertUtil: AlertUtil,
    private oLoadingUtil: LoadingUtil,
    private oObjectUtil: ObjectUtil,
    private oStorageUtil: StorageUtil,
    private oHttpClient: HttpClient,
    private oTranslateService: TranslateService,
    private oNgxSoapService: NgxSoapService,
  ) {
  }

  /**
   * alert
   */
  public alert(): AlertUtil {
    return this.oAlertUtil;
  }

  /**
   * http
   */
  public http(): HttpClient {
    return this.oHttpClient;
  }

  /**
   * loading
   */
  public loading(): LoadingUtil {
    return this.oLoadingUtil;
  }

  /**
   * object
   */
  public object(): ObjectUtil {
    return this.oObjectUtil;
  }

  /**
   * object
   */
  public translate(): TranslateService {
    return this.oTranslateService;
  }

  /**
   * soap
   */
  public soap(): NgxSoapService {
    return this.oNgxSoapService;
  }

  /**
   * storage
   */
  public storage(): StorageUtil {
    return this.oStorageUtil;
  }

  /**
   * abre un websocket para la transmision de dato en tiempo real
   *
   * @param uri
   * @param options
   */
  public getWebsocket(uri: string, options: {
    firstMessage?: any,
    success: any,
    error?: any,
    remote?: boolean,
  }): WebSocketSubject<any> {
    options = this.object().getDefault(options, {});
    options.firstMessage = this.object().getDefault(options.firstMessage, '');
    options.success = this.object().getDefault(options.success, () => {
    });
    options.error = this.object().getDefault(options.error, () => {
    });
    const subject = webSocket(this.getUri(uri, null, true));

    subject.subscribe(
      (message: any) => options.success(message),
      (err: any) => options.error(err),
    );
    subject.next({message: options.firstMessage, jwt: this.getHeader('Authorization')});

    return subject;
  }

  /**
   * realiza la consulta con el metodo GET
   *
   * @param path
   * @param options
   */
  public soapCall = (path: string, options?: {
    endpoint?: string,
    success?: any,
    optionWsdl?: any,
  }): void => {
    this.loading().fullProgress();

    const protocol = window.location.protocol;
    const cors = protocol.indexOf('http:') > -1 && path.indexOf('https:') > -1 ? this.storage().environments().urlCors : '';
    options = this.object().getDefault(options, {});
    options.endpoint = this.object().getDefault(options.endpoint, '');
    options.success = this.object().getDefault(options.success, () => {
    });
    options.optionWsdl = this.object().getDefault(options.optionWsdl, {});

    this.soap().createClient(cors + path, options.optionWsdl)
      .then((response) => {
        if (cors && options.endpoint !== '') {
          response.setEndpoint(cors + options.endpoint);
        }

        this.loading().resetProgress();

        options.success(response);
      }).catch(error => {
      this.callError(error, null);
    });
  }

  /**
   * Realiza el llamado del metodo
   *
   * @param soapResult
   * @param method
   * @param body
   * @param success
   */
  public call(soapResult: any, method: string, body: any, success: any): void {
    this.loading().fullProgress();

    soapResult.call(method, body).subscribe(result => {
      success(result);
      this.loading().resetProgress();
    }, error => {
      this.loading().resetProgress();
      this.callError(error, null);
    });
  }

  /**
   * realiza la consulta con el metodo GET
   *
   * @param o
   * @param options
   */
  public get<T>(o: any, options?: {
    path?: string,
    showError?: boolean,
    showSuccess?: boolean,
    onLoad?: any,
    type?: any,
    entity?: any,
    options?: {
      headers?: any,
      params?: any,
      reportProgress?: boolean,
      withCredentials?: boolean,
    },
  }): Promise<any> {
    options = this.getOptions(options);
    const uri = this.getUri(options.path, o);

    return new Promise<any>((resolve, reject) => {
      this.oHttpClient.get<T>(uri, {
        headers: this.getHeaders(),
        observe: 'events',
        params: options?.options?.params,
        reportProgress: options?.options?.reportProgress || true,
        responseType: 'json',
        withCredentials: options?.options?.withCredentials || false,
      }).pipe(map((event: HttpEvent<T>) => {
          return this.callEvent<T>(event);
        }),
      ).subscribe((response: HttpResponse<T>) => {
        this.callSuccess<T>(response, resolve, options);
      }, (error: HttpErrorResponse) => {
        this.callError<T>(error, reject, options);
      });
    });
  }

  /**
   * realiza la consulta con el metodo POST
   *
   * @param o
   * @param options
   */
  public post<T>(o: any, options?: {
    path?: string,
    showError?: boolean,
    showSuccess?: boolean,
    onLoad?: any,
    entity?: any,
    options?: {
      headers?: any,
      params?: any,
      reportProgress?: boolean,
      withCredentials?: boolean,
    },
  }): Promise<any> {
    options = this.getOptions(options);
    const uri = this.getUri(options.path);

    return new Promise<any>((resolve, reject) => {
      this.oHttpClient.post<T>(uri, o, {
        headers: this.getHeaders(),
        observe: 'events',
        params: options?.options?.params,
        reportProgress: options?.options?.reportProgress || true,
        responseType: 'json',
        withCredentials: options?.options?.withCredentials || false,
      }).pipe(map((event: HttpEvent<T>) => {
          return this.callEvent<T>(event);
        }),
      ).subscribe((response: HttpResponse<T>) => {
          this.callSuccess<T>(response, resolve, options);

          if (options.showSuccess && response?.headers !== undefined) {
            this.alert().showToast({
              title: this.translate().instant('error.title.' + 200),
              message: this.translate().instant('app.savesuccess'),
              userConfig: {
                duration: 10000,
              },
            });
          }
        }, (error: HttpErrorResponse) => {
          this.callError<T>(error, reject, options);
        },
      );
    });
  }

  /**
   * realiza la consulta con el metodo PUT
   *
   * @param o
   * @param options
   */
  public put<T>(o: any, options?: {
    path?: string,
    showError?: boolean,
    showSuccess?: boolean,
    onLoad?: any,
    entity?: any,
    options?: {
      headers?: any,
      withCredentials?: boolean,
    },
  }): Promise<any> {
    options = this.getOptions(options);
    const uri = this.getUri(options.path, o);

    return new Promise<any>((resolve, reject) => {
      this.oHttpClient.put<T>(uri, o, {
        headers: this.getHeaders(),
        observe: 'events',
        responseType: 'json',
        withCredentials: options?.options?.withCredentials || false,
      }).pipe(map((event: HttpEvent<T>) => {
          return this.callEvent<T>(event);
        }),
      ).subscribe((response: HttpResponse<T>) => {
          this.callSuccess<T>(response, resolve, options);

          if (options.showSuccess && response.headers !== undefined) {
            this.alert().showToast({
              title: this.translate().instant('error.title.' + 200),
              message: this.translate().instant('app.updatesuccess'),
              userConfig: {
                duration: 10000,
              },
            });
          }
        }, (error: HttpErrorResponse) => {
          this.callError<T>(error, reject, options);
        },
      );
    });
  }

  /**
   * realiza la consulta con el metodo DELETE
   *
   * @param o
   * @param options
   */
  public delete<T>(o: any, options?: {
    path?: string,
    showError?: boolean,
    showSuccess?: boolean,
    onLoad?: any,
    entity?: any,
    options?: {
      headers?: any,
      params?: any,
      reportProgress?: boolean,
      withCredentials?: boolean,
    },
  }): Promise<any> {
    options = this.getOptions(options);
    const uri = this.getUri(options.path, o);

    return new Promise<any>((resolve, reject) => {
      this.oHttpClient.delete<T>(uri, {
        headers: this.getHeaders(),
        observe: 'events',
        params: options?.options?.params,
        reportProgress: options?.options?.reportProgress || true,
        responseType: 'json',
        withCredentials: options?.options?.withCredentials || false,
      }).pipe(map((event: HttpEvent<T>) => {
          return this.callEvent(event);
        }),
      ).subscribe((response: HttpResponse<T>) => {
          this.callSuccess<T>(response, resolve, options);

          if (options.showSuccess && response.headers !== undefined) {
            this.alert().showToast({
              title: this.translate().instant('error.title.' + 200),
              message: this.translate().instant('app.deletesuccess'),
              userConfig: {
                duration: 10000,
              },
            });
          }
        }, (error: HttpErrorResponse) => {
          this.callError<T>(error, reject, options);
        },
      );
    });
  }

  /**
   * obtiene las cabeceras
   */
  private getHeaders(): any {
    return new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', this.getHeader(this.stgAuthJwt))
      .set(this.stgAuthOrganization, this.storage().environments().organization);
  }

  /**
   * setea las cabeceras
   *
   * @param header
   */
  private setHeaders(header: HttpHeaders): void {
    const headers = [this.stgAuthJwt];
    const time: Date = new Date();

    for (let h of headers) {
      if (header.has(h) || header.has(h.toLowerCase())) {
        h = (header.has(h)) ? h : h.toLowerCase();
        this.storage().setStorage(h, header.get(h));
        this.storage().setStorage('TimeHeaders', time.getTime());
      }
    }
  }

  /**
   * obtiene la cabecera
   *
   * @param key
   */
  private getHeader(key: string): string {
    return 'Bearer ' + this.storage().getStorage(key);
  }

  /**
   * construye la uri según los parametros indicados
   *
   * @param path
   * @param entity
   * @param ws
   */
  private getUri = (path: string, entity?: any, ws?: boolean): string => {
    const isHttp = path.indexOf('http://') < 0;
    const isHttps = path.indexOf('https://') < 0;
    const isFtp = path.indexOf('ftp://') < 0;
    const protocol = window.location.protocol;

    path = isHttp && isHttps && isFtp ? this.storage().environments().urlServer + path : path;
    path = path.replace(/\/\//g, '/').replace(':/', '://');
    path = ws ? path.replace('http:', 'ws:').replace('https:', 'wss:') : path;
    path = path + (entity != null ? (entity.id != null ? '/' + entity.id : '') : '');
    path = protocol.indexOf('http:') > -1 && path.indexOf('https:') > -1 ? this.storage().environments().urlCors + path : path;

    return path;
  }

  /**
   * construye las opciones predeterminadas
   *
   * @param options
   */
  private getOptions = (options?: {
    path?: string,
    showError?: boolean,
    showSuccess?: boolean,
    onLoad?: any,
    type?: any,
    entity?: any,
  }): any => {
    this.loading().fullProgress();

    options = this.object().getDefault(options, {});
    options.path = this.object().getDefault(options.path, '');
    options.onLoad = this.object().getDefault(options.onLoad, (data) => {
    });
    options.showError = this.object().getDefault(options.showError, true);
    options.showSuccess = this.object().getDefault(options.showSuccess, true);
    options.type = this.object().getDefault(options.type, null);
    options.entity = this.object().getDefault(options.entity, null);

    return options;
  }

  /**
   *
   * @param event
   */
  private callEvent<T>(event: HttpEvent<T>): HttpEvent<T> | { status: string, message: number } {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        const progress = Math.round(100 * event.loaded / event.total);
        return {status: 'progress', message: progress};

      case HttpEventType.Response:
        return event;
      default:
        return {status: 'progress', message: 100};
    }
  }

  /**
   * exito predeterminado
   *
   * @param response
   * @param resolve
   * @param options
   */
  private callSuccess<T>(response: HttpResponse<T> | { status: string, message: number }, resolve: any, options?: {
    path?: string,
    cors?: boolean,
    onLoad?: any,
    entity?: any,
  }): void {
    if ((<HttpResponse<T>>response).headers !== undefined) {
      this.setHeaders((<HttpResponse<T>>response).headers);
      const body: any = (<HttpResponse<T>>response).body;

      this.loading().resetProgress();

      if (this.object().isNotNull(resolve)) {
        if (this.object().isNotNull(options.entity)) {
          resolve((new options.entity).deepCopy(body, options.entity));
        } else {
          resolve(body);
        }
      }
    } else {
      this.loading().setProgress(<{ status: string, message: number }>response);
      options.onLoad(<{ status: string, message: number }>response);
    }
  }

  /**
   * error predeterminado
   *
   * @param error
   * @param reject
   * @param options
   */
  private callError<T>(error: HttpErrorResponse, reject: any, options?: {
    path?: string,
    remote?: boolean,
    cors?: boolean,
    showError?: boolean,
    showSuccess?: boolean,
    onLoad?: any,
  }): void {
    const err = this.object().getDefault(error.error, {});
    const code = this.object().getDefault(err.code, error.status);
    const messageTr = this.translate().instant('error.message.' + code);
    let message = this.object().getDefault(err.message, error.statusText);
    this.loading().setProgress({status: 'error', message: 101});

    if (messageTr !== 'error.message.' + code) {
      const a = message?.indexOf('Detail:');
      message = a > -1 ? message.substring(a, message?.length - 1).replace('Detail:', '. Detalle:') : '. ' + message;
      message = messageTr; // + message;
    }

    if (this.object().isNotNull(reject)) {
      reject(error.error);
    }

    if (options.showError) {
      this.alert().showToast({
        title: this.translate().instant('error.title.' + code),
        message: message,
        userConfig: {
          status: 'danger',
          duration: 10000,
        },
      });
    }

    this.object().timeout(1000).then(() => {
      this.loading().resetProgress();
    });
  }

}
