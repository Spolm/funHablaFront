import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageUtil {

  constructor() {
  }

  /**
   * obtiene las variables del entorno
   */
  public environments(): any {
    return environment;
  }

  /**
   * obtiene un valor almacenado
   *
   * @param key
   * @param options
   */
  public getStorage(key: string, options?: { def?: any, jsonParse?: any }): any {
    return (this.environments().session) ? this.getStorageSession(key, options) : this.getStorageLocal(key, options);
  }

  /**
   * setea una variable para almacenar en el navegador
   *
   * @param key
   * @param value
   * @param options
   */
  public setStorage(key: string, value: any, options?: { def?: any, jsonParse?: boolean }): void {
    (this.environments().session) ? this.setStorageSession(key, value, options) : this.setStorageLocal(key, value, options);
  }

  /**
   * obtiene un valor almacenado en el navegador
   *
   * @param key
   * @param options
   */
  public getStorageLocal(key: string, options?: { def?: any, jsonParse?: any }): any {
    const oValue = localStorage.getItem(key);

    return this.get(oValue, options);
  }

  /**
   * setea una variable para almacenar en el navegador
   *
   * @param key
   * @param value
   * @param options
   */
  public setStorageLocal(key: string, value: any, options?: { def?: any, jsonParse?: boolean }): void {
    localStorage.setItem(key, this.set(value, options));
  }

  /**
   * obtiene un valor almacenado en el navegador
   *
   * @param key
   * @param options
   */
  public getStorageSession(key: string, options?: { def?: any, jsonParse?: any }): any {
    const oValue = sessionStorage.getItem(key);

    return this.get(oValue, options);
  }

  /**
   * setea una variable para almacenar en el navegador
   *
   * @param key
   * @param value
   * @param options
   */
  public setStorageSession(key: string, value: any, options?: { def?: any, jsonParse?: boolean }): void {
    sessionStorage.setItem(key, this.set(value, options));
  }

  /**
   * Limpia la session
   */
  public setClear(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  /**
   * operacion get Item
   *
   * @param value
   * @param options
   */
  private get(value: any, options?: { def?: any, jsonParse?: any }): any {
    options = options || {def: '', jsonParse: false};
    options.def = options.def || '';
    options.jsonParse = options.jsonParse || false;

    if (value) {
      if (options.jsonParse === false) {
        return value;
      } else if (options.jsonParse === true) {
        return JSON.parse(value);
      }

      return (new options.jsonParse).deepCopy(JSON.parse(value), options.jsonParse);
    }

    return options.def;
  }

  /**
   * operacion get Item
   *
   * @param value
   * @param options
   */
  private set(value: any, options?: { def?: any, jsonParse?: boolean }): any {
    options = options || {def: '', jsonParse: false};
    options.def = options.def || '';
    options.jsonParse = options.jsonParse || false;

    return value ? ((options.jsonParse) ? JSON.stringify(value) : value) : options.def;
  }
}
