import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

export class Usuario {

    constructor( 
        public uid:String,
        public nombre: string,
        public email: string
     ){}

}