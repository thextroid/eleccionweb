import { Circunscripcion } from './circunscripcion';
import { Localidad } from "./localidad";
import { Municipio } from "./municipio";
import { Provincia } from './provincia';

export class Recinto {
  _id: string;
  id: string;
  institucion: string;
  tipo: any[];
  localidad: Localidad;
  provincia: Provincia;
  circunscripcion: Circunscripcion;
  municipio: Municipio;
  localizacion: any[];
  mesas:any[];
  totalHabilitados:number;
  totalMesas:number;
  numeroMesas: number;
}
