import { Departamento } from './departamento';
import { Provincia } from './provincia';

export class Circunscripcion{
    _id:string;
    id:string;
    name:string;
    provincias:Provincia[];
    departamento:Departamento;
}