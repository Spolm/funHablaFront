import {EventEmitter, Injectable, Output} from '@angular/core';
// import {AlertMessageComponent} from './components/alert.message.component';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {NbToastrConfig} from '@nebular/theme/components/toastr/toastr-config';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class AlertUtil {

  @Output() alert: EventEmitter<any> = new EventEmitter();
  public dataAlert: any = {
    type: 'success',
    message: 'Exito!',
    open: false,
  };

  constructor(
    private oDomSanitizer: DomSanitizer,
    private oNbDialogService: NbDialogService,
    private oNbToastrService: NbToastrService,
  ) {
  }

  /**
   * satinizer
   */
  public sanitizer(): DomSanitizer {
    return this.oDomSanitizer;
  }

  /**
   * dialog
   */
  public dialog(): NbDialogService {
    return this.oNbDialogService;
  }

  /**
   * toastr
   */
  public toastr(): NbToastrService {
    return this.oNbToastrService;
  }

  /**
   * Setea una alerta
   *
   * @param message
   * @param type
   * @param keep
   */
  public setAlert(message?: string, type?: string, keep?: boolean) {
    keep = keep === undefined ? false : keep;
    this.dataAlert.message = message || 'Exito!';
    this.dataAlert.type = type || 'success';
    this.dataAlert.open = true;

    //this.timeout(10).then(() => this.alert.emit(this.dataAlert));

    if (!keep) {
      //this.timeout(8 * 1000).then(() => this.endAlert());
    }
  }

  /**
   * culmina la alerta
   */
  public endAlert() {
    this.dataAlert.open = false;
    //this.timeout(2 * 1000).then(() => this.alert.emit(this.dataAlert));
  }

  /**
   * Abre una ventana de dialogo
   *
   * @param _context
   */
  public openDialog(_context: {
    title: string,
    message?: string,
    content?: any,
    accept?: any,
    acceptTitle?: string,
    decline?: any,
    declineTitle?: string,
  }) {
    _context.content = this.sanitizer().bypassSecurityTrustHtml(_context.content || '');

    // this.dialog().open(AlertMessageComponent, {
    //   context: _context,
    // });
  }

  showToast(context: { title: string, message: string, userConfig?: Partial<NbToastrConfig> }) {
    const postition: any = 'top-right';
    context.userConfig = context.userConfig || {};
    context.userConfig.duration = context.userConfig.duration || 0;
    context.userConfig.status = context.userConfig.status || 'success';
    context.userConfig.position = context.userConfig.position || postition;
    context.userConfig.duplicatesBehaviour = context.userConfig.duplicatesBehaviour || 'all';
    context.userConfig.preventDuplicates = context.userConfig.preventDuplicates || true;

    this.toastr().show(context.message, context.title, context.userConfig);
  }

  /**
   * realiza una espera segun lo que se le indique
   *
   * @param time
   */
  // public timeout(time: number): Promise<any> {
  //   return new Promise<any>((resolve) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, time);
  //   });
  // }

}
