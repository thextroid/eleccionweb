import { Localidad } from "./localidad";
import { Municipio } from "./municipio";

export class Recinto {
  _id: string;
  id: string;
  institucion: string;
  tipo: any[];
  localidad: Localidad;
  municipio: Municipio;
  localizacion: any[];
  numeroMesas: number;
}
