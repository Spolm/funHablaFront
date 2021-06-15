import {GridOrderUtil} from './grid/grid.order.util';
import {GridColumnUtil} from './grid/grid.column.util';

export class GridUtil {

  // REQUEST
  public draw: number;
  public start: number;
  public length: number;
  public search: string;
  public order: GridOrderUtil = new GridOrderUtil();
  public columns: GridColumnUtil[];

  // RESPONSE
  public recordsTotal: number = 0;
  public recordsFiltered: number = 0;
  public data: any[];

  // RESPONSE LARAVEL
  public current_page: number = 1;
  public first_page_url: string = '';
  public last_page_url: string = '';
  public next_page_url: string = '';
  public prev_page_url: string = '';
  public path: string = '';
  public from: number = 1;
  public last_page: number = 1;
  public per_page: number = 15;
  public to: number = 0;
  public total: number = 0;

  constructor() {
    this.draw = 1;
    this.start = 0;
    this.length = 25;
    this.search = '';
    this.order = new GridOrderUtil();
    this.recordsTotal = 0;
    this.recordsFiltered = 0;
    this.columns = [];
    this.data = [];
  }

  /**
   * retorna la cantidad de datos para la paginacion
   */
  getLength() {
    return this.length > 0 ? this.length : 25;
  }

  /**
   * retorna la pagina actual
   */
  getPages() {
    return this.recordsFiltered > 0 ? this.recordsFiltered / this.length : 1;
  }

  /**
   * indica que debe buscar todos los registros
   */
  setMaxLength(): GridUtil {
    this.length = -1;

    return this;
  }

  /**
   * convierte la data en la entidad deseada
   *
   * @param entity
   */
  deepCopyData(entity?: any) {
    if (this.data !== null && this.data !== undefined && this.data.length > 0 && entity !== null) {
      return (new entity).deepCopy(this.data, entity);
    }

    return this.data;
  }

  /**
   * hace una copia fiel del objeto en la entidad
   *
   * @param json
   * @param entity
   */
  deepCopy(json: any, entity?: any) {
    if (json instanceof Array) {
      const entities: any[] = [];

      json.forEach((o: this) => {
        entities.push(Object.assign(entity !== undefined ? new entity : this, o));
      });

      return entities;
    } else {
      return Object.assign(this, json);
    }
  }

  toStringData(): string {
    try {
      return JSON.stringify(this.data);
    } catch (e) {
      //
    }

    return '';
  }

  toString(): string {
    try {
      return JSON.stringify(this);
    } catch (e) {
      //
    }

    return '';
  }

}
