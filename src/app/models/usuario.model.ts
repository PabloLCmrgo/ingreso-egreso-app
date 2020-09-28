import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

export class Usuario {

    static fromFirebase ({email, uid, nombre}){
        return new Usuario(uid, nombre, email);
    }

    constructor( 
        public uid:String,
        public nombre: string,
        public email: string
     ){}

}