import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingUtil {

  isProgress: { status: string, value: number } = {status: 'progress', value: 0};
  @Output() loading: EventEmitter<boolean> = new EventEmitter();
  @Output() progress: EventEmitter<{ status: string, value: number }> = new EventEmitter();

  constructor() {
  }

  /**
   *
   * @param state
   */
  emit(state: boolean) {
    this.timeout(10).then(() => {
      this.loading.emit(state);
    });
  }

  /**
   *
   * @param progress
   */
  setProgress(progress: { status: string, message: number }) {
    const value: number = progress.message;
    let status: string;

    if (value >= 0 && value < 10) {
      status = 'control';
    } else if (value > 11 && value < 20) {
      status = 'warning';
    } else if (value > 31 && value < 40) {
      status = 'basic';
    } else if (value > 51 && value < 60) {
      status = 'info';
    } else if (value > 71 && value < 80) {
      status = 'primary';
    } else if (value > 91 && value <= 100) {
      status = 'success';
    } else {
      status = 'danger';
    }
    const progressBar = {
      value: value,
      status: status,
    };

    this.isProgress = progressBar;

    this.timeout(10).then(() => {
      this.progress.emit(progressBar);
    });
  }

  /**
   * indica un 100% de progreso
   */
  fullProgress() {
    this.setProgress({status: 'success', message: 100});
  }

  /**
   * resetea la barra de progreso
   */
  resetProgress() {
    this.setProgress({status: 'control', message: 0});
  }

  /**
   * realiza una espera segun lo que se le indique
   *
   * @param time
   */
  public timeout(time: number): Promise<any> {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

}
