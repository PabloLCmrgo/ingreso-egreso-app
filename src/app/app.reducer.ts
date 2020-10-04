import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/iu.reducer';
import * as auth from './auth/auth.reducer';
import * as ingreoEgreso from './ingreso-egreso/ingreso-egreso.reducer';


export interface AppState {
   ui: ui.State,
   user:auth.State,
   ingresosEgresos: ingreoEgreso.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer,
   ingresosEgresos: ingreoEgreso.ingresoEgresoReducer
}