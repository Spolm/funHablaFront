import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ObjectUtil {

  public idCompare: string = 'id';
  public itemsError: any = {
    required: 'Debe ingresar información en el campo',
    min: 'Debe ingresar un valor mayor de: ${min.min}',
    max: 'Debe ingresar un valor menor de: ${max.max}',
    minlength: 'Debe ingresar más de ${minlength.requiredLength} carácteres',
    maxlength: 'Debe ingresar más de ${maxlength.requiredLength} carácteres',
    email: 'Debe ingresar una dirección de correo válida',
    pattern: 'El valor introducido no coincide con el patrón indicado',
  };
  timeoutVar: any[] = [];
  intervalVar: any[] = [];
  private days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  private months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor() {
  }

  /**
   * obtiene las variables del entorno
   */
  public environments(): any {
    return environment;
  }

  /**
   * determina si el objeto es null
   *
   * @param o
   */
  public isNull(o: any) {
    return o === undefined || o === null;
  }

  /**
   * determina si el objeto no es null
   *
   * @param o
   */
  public isNotNull(o: any) {
    return !this.isNull(o);
  }

  /**
   * determina si es de un tipo
   *
   * @param o
   * @param type
   */
  public isType(o: any, type: string) {
    return this.isNull(o) && typeof o !== type;
  }

  /**
   * determina si no esta en una lista de tipos
   *
   * @param o
   * @param types
   */
  public isNotType(o: any, types: string[]) {
    let pass: boolean = true;

    if (this.isNull(o)) {
      return false;
    }

    types.every(t => {
      if (typeof o === t) {
        pass = false;
      }
    });

    return pass;
  }

  /**
   * obtiene un valor predefinido de un valor
   *
   * @param o
   * @param d
   */
  public getDefault(o: any, d: any) {
    return this.isNull(o) ? d : o;
  }

  /**
   * obtiene un tamaño de un objeto
   *
   * @param o
   */
  public getSize(o: any[]): number {
    if (!this.isNull(o)) {
      return (!this.isNull(o.length)) ? o.length : 0;
    }

    return 0;
  }

  /**
   * realiza una espera segun lo que se le indique
   *
   * @param time
   * @param id
   */
  public timeout(time: number, id?: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.timeoutVar[id || Math.round(Math.random() * 1000).toString()] = setTimeout(() => {
        resolve();
      }, time);
    });
  }

  /**
   * realiza una espera segun lo que se le indique
   *
   * @param time
   * @param id
   */
  public interval(time: number, id: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.intervalVar[id] = setInterval(() => {
        resolve();
      }, time);
    });
  }

  /**
   * limpia el intervalo
   *
   * @param id
   */
  public clearInterval(id: string): Promise<any> {
    const interval = this.intervalVar[id];

    return new Promise<any>((resolve) => {
      if (interval) {
        clearInterval(interval);
      }

      resolve();
    });
  }

  /**
   * limpia el timeout
   *
   * @param id
   */
  public clearTimeout(id: string): Promise<any> {
    const timeout = this.timeoutVar[id];

    return new Promise<any>((resolve) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      resolve();
    });
  }

  /**
   * compara strings
   *
   * @param o1
   * @param o2
   */
  public compare(o1: string, o2: string) {
    return o1 === o2;
  }

  /**
   * ordenamiento de objetos por objeto
   *
   * @param o1
   * @param o2
   */
  public compareFn(o1?: any, o2?: any) {
    return o1 === o2;
  }

  /**
   * ordenamiento de objetos por id
   *
   * @param o1
   * @param o2
   */
  public compareFnById(o1?: any, o2?: any) {
    return o1?.id === o2?.id || o1 === o2;
  }

  /**
   * ordenamiento de objetos por nombres
   *
   * @param o1
   * @param o2
   */
  public compareFnbyName(o1: any, o2: any) {
    return o1?.name === o2?.name || o1 === o2;
  }

  /**
   * setea el id para comparar con la funcion compareFn
   *
   * @param id
   */
  public setIdCompare(id: string): this {
    this.idCompare = id;

    return this;
  }

  /**
   * compara contraseñas
   *
   * @param password
   * @param repassword
   */
  public comparePassword(password: string, repassword: string) {
    return password === repassword;
  }

  /**
   * compara contraseñas
   *
   * @param group
   */
  public compareFormPassword(group: FormGroup) {
    const password = group.controls.password.value;
    const repassword = group.controls.repassword.value;

    return password === repassword ? null : {notSame: true};
  }

  /**
   * previene los eventos
   *
   * @param event
   */
  disableKey(event: KeyboardEvent): void {
    const target: any = event.target;
    target.disabled = true;
    event.preventDefault();
  }

  /**
   * Inicializa el array
   *
   * @param list
   */
  public flushArray(list: any[]): any[] {
    return list || [];
  }

  /**
   *
   * @param arr
   * @param obj
   */
  public upsert(arr: any[], obj: any): any[] {
    if (obj) {
      const index = arr.findIndex((e) => e.id === obj.id);

      if (index === -1) {
        arr.push(obj);
      }
    }

    return arr;
  }

  /**
   * retorna los dias de la semana
   */
  public getDays(): string[] {
    return this.days;
  }

  /**
   * retorna los dias de la semana
   *
   * @param index
   */
  public getDay(index: number): string {
    return this.days[index] || this.days[index--];
  }

  /**
   * retorna los meses del año
   */
  public getMonths(): string[] {
    return this.months;
  }

  /**
   * retorna los meses del año
   *
   * @param index
   */
  public getMonth(index: number): string {
    return this.months[index] || this.months[index--];
  }

  /**
   * clona un objeto
   *
   * @param o
   */
  public clone(o: any): any {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (null == o || 'object' !== typeof o) return o;

    // Handle Date
    if (o instanceof Date) {
      copy = new Date();
      copy.setTime(o.getTime());

      return copy;
    }

    // Handle Array
    if (o instanceof Array) {
      copy = [];

      for (let i = 0, len = o.length; i < len; i++) {
        copy[i] = this.clone(o[i]);
      }

      return copy;
    }

    // Handle Object
    if (o instanceof Object) {
      copy = {};

      for (const attr in o) {
        if (o.hasOwnProperty(attr)) copy[attr] = this.clone(o[attr]);
      }

      return copy;
    }

    throw new Error('Unable to copy obj! Its type isnt supported.');
  }

  /**
   * Obtiene un mensaje de error para mostrarlo en el formulario
   *
   * @param o
   * @param m
   */
  getErrorMessage(o: any, m?: string): string {
    let errorMessage: string = '';
    const expresion = /\$\{([a-zA-Z0-9\.]+)\}/gm;

    for (const key in this.itemsError) {
      if (this.itemsError.hasOwnProperty(key) && o.hasError(key) && o.errors[key] !== undefined) {
        let value = this.itemsError[key];

        if (value.indexOf('${') > -1) {
          let v: string = '';
          const strings = value.match(expresion)[0];
          const count = strings.replace(/\$|\{|\}/gm, '').split('.', 4);

          if (count.length > 0) {
            if (count.length === 1) {
              v = o.errors[count[0]];
            } else if (count.length === 2) {
              v = o.errors[count[0]][count[1]];
            } else if (count.length === 3) {
              v = o.errors[count[0]][count[1]][count[2]];
            } else {
              v = o.errors[count[0]][count[1]][count[2]][count[3]];
            }
          }

          value = value.replace(/\$\{.+\}/, v);
        }

        errorMessage = value;
      }
    }

    return errorMessage;
  }

  /**
   * obtiene un child de un json en modo recursivo
   *
   * @param obj
   * @param desc
   */
  public getChildRecursive(obj, desc) {
    if (!obj || !desc) {
      return null;
    }

    let arr = desc.split(/[.\[\]]/).filter(el => el && el !== '');
    if (arr && !Array.isArray(arr)) {
      arr = [arr];
    }

    while (arr.length && (obj = obj[arr.shift()])) ;

    return obj;
  }

  /**
   * obtiene un valor de un array o retorna el valor por defecto
   *
   * @param data
   * @param search
   */
  public getItem(data: any, search: string): string {
    return data !== undefined ? (data['error.' + search] !== undefined ? data['error.' + search] : search) : search;
  }

  public printHtml(options: {
    title?: string,
    height?: number,
    width?: number,
    footer?: string,
    element: string,
  }): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      options.height = options.height || window.innerHeight - 100;
      options.width = options.width || window.innerWidth - 100;

      if (options.element.startsWith('#')) {
        const ele: HTMLElement = document.getElementById(options.element.replace('#', ''));
        options.element = ele.innerHTML;
      } else if (options.element.startsWith('.')) {
        const els: HTMLCollectionOf<Element> = document.getElementsByClassName(options.element.replace('.', ''));
        options.element = '';

        for (let i = 0; i < els.length; i++) {
          options.element += els.item(i).innerHTML;
        }
      } else {
        const els: HTMLCollectionOf<Element> = document.getElementsByTagName(options.element);
        options.element = '';

        for (let i = 0; i < els.length; i++) {
          options.element += els.item(i).innerHTML;
        }
      }

      const wprint = window.open('', '_blank', 'height=' + window.innerHeight + ',width=' + window.innerWidth);

      wprint.document.write('<html><head><title>' + document.title + '</title></head>');
      wprint.document.write('<body style="height: ' + options?.height + ';width: ' + options?.width + '">');
      if (options?.title) {
        wprint.document.write('<h1 style="text-align: center">' + options.title + '</h1>');
      }
      wprint.document.write(options.element);
      if (options?.title) {
        wprint.document.write('<h1 style="position: absolute; bottom: 0; text-align: center">' + options.footer + '</h1>');
      }
      wprint.document.write('</body></html>');

      wprint.focus(); // necessary for IE >= 10

      wprint.print();
      this.timeout(2000).then(() => {
        wprint.document.close(); // necessary for IE >= 10
        wprint.close();
        resolve();
      });
    });
  }

}
