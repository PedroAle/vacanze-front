import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class ApiService {
   
    public reclamo = [
        {titulo: 'Mr. Nice', descripcion: 'aaaa', status:'ABIERTO' }
    ];

    private apiName = environment.baseApiUrl;
    
    private myInit = {
        /* headers: {
          'x-api-key': environment.apiKey
        } */
    };

    constructor(private http: HttpClient) { }

    public getReclamo(): Observable<any>{
        return this.http.get('https://localhost:5001/api/Reclamo');
    }

    public addReclamo (): Observable<any> {
        return this.http.post<any>(
            'https://localhost:5001/api/Reclamo', this.reclamo, httpOptions);
    }

    public deleteReclamo (data): Promise<any> {
        this.myInit['body'] = data;
        return this.http.delete('https://localhost:5001/api/Reclamo/73', this.myInit).toPromise();
    }

    public putrReclamoStatus(data): Promise<any>
    {
        this.myInit['body'] = data;
        return this.http.put('https://localhost:5001/api/Reclamo/status/56', this.myInit).toPromise();
    }
    /*******************************************************
    * Metodo para realizar el consumo del API de tipo GET  *
    ********************************************************/
    public getUrl(url: string, parameter?: Array<string>): Promise<any> {
        // Cuando la URL contiene uno o más parametros, sustituirlos por los elementos del arreglo parameter
        if (parameter && url && url.indexOf('{') !== -1) {
            parameter.forEach(p => {
                url = url.replace(/{[a-zA-Z_]*}/, p);
            });
        }
        return <Promise<any>>this.http.get(this.apiName + url).toPromise();
    }

    /*******************************************************
    * Metodo para realizar el consumo del API de tipo POST *
    ********************************************************/
    public postUrl(url, data, parameter?: Array<string>): Promise<any> {
        // Cuando la URL contiene uno o más parametros, sustituirlos por los elementos del arreglo parameter
        if (parameter && url && url.indexOf('{') !== -1) {
            parameter.forEach(p => {
                url = url.replace(/{[a-zA-Z_]*}/, p);
            });
        }

        this.myInit['body'] = data;
        return <Promise<any>>(
            this.http.post(this.apiName + url, data, httpOptions).toPromise()
        );
    }

    /*******************************************************
    * Metodo para realizar el consumo del API de tipo PUT  *
    ********************************************************/
    public putUrl(url, data?, parameter?: Array<string>): Promise<any> {
        // Cuando la URL contiene uno o más parametros, sustituirlos por los elementos del arreglo parameter
        if (parameter && url && url.indexOf('{') !== -1) {
            parameter.forEach(p => {
                url = url.replace(/{[a-zA-Z_]*}/, p);
            });
        }

        this.myInit['body'] = data;
        return <Promise<any>>(
            this.http.put(this.apiName + url, data).toPromise()
        );
    }

    /**********************************************************
    * Metodo para realizar el consumo del API de tipo DELETE  *
    ***********************************************************/
    public deleteUrl(url, parameter?: Array<string>): Promise<any> {
        // Cuando la URL contiene uno o más parametros, sustituirlos por los elementos del arreglo parameter
        if (parameter && url && url.indexOf('{') !== -1) {
            parameter.forEach(p => {
                url = url.replace(/{[a-zA-Z_]*}/, p);
            });
        }

        return <Promise<any>>(
            this.http.delete(this.apiName + url).toPromise()
        );
    }
    /***************************************************************************
    * Metodo para realizar el consumo del API de tipo DELETE con body incluido *
    ****************************************************************************/
    public deleteUrlWithBody(url, data, parameter?: Array<string>): Promise<any> {
        // Cuando la URL contiene uno o más parametros, sustituirlos por los elementos del arreglo parameter
        if (parameter && url && url.indexOf('{') !== -1) {
            parameter.forEach(p => {
                url = url.replace(/{[a-zA-Z_]*}/, p);
            });
        }

        this.myInit['body'] = data;
        return <Promise<any>>(
            this.http.delete(this.apiName + url, this.myInit).toPromise()
        );
    }

}
