
import humps from "lodash-humps-ts"
import AuthController from "@/services/Auth"

export default class Api {
    private _url: String = import.meta.env.VITE_API_BASE_URL;
    private static instance: Api | null = null

    public static getInstance() {
        if (Api.instance === null) {
            Api.instance = new Api()
        }

        return Api.instance
    }

    public async get(path: string, body: GetBody = {},): Promise<Response> {
        const controller = new AbortController();
        // const uuid = Math.random() * 99999;
        const promise: Promise<Response> = new Promise(async (resolve, reject) => {

            const params = this.buildParams(body)

            try {
                const response: Response = await fetch(`${this._url}${path}?${params}`, {
                    method: "GET",
                    signal: controller.signal,
                    headers: this.makeHeaders(false, false),
                })
                
                let result: any = await response.json();

                if (!response.ok) {
                    if (response.status === 401) {
                        AuthController.getInstance().setToken(null);
                        throw new Error("No auth");
                        return;
                    }
                    throw new Error(result.message);
                }

                resolve(humps(result));
            } catch (e: any) {
                AuthController.getInstance().setToken(null);
                reject(new Error(e.message));
            }
        });
        return promise;
    }

    // @autobind
    public async post(path: string, body: FormData | any, isFile: boolean = false): Promise<Response> {
        // const controller = new AbortController();
        // const uuid = Math.random() * 99999;
        const promise: Promise<Response> = new Promise(async (resolve, reject) => {
            const controller = new AbortController();
            let jsonFormat = true;
            if (body !instanceof FormData) jsonFormat = false;
            try {
                const response: Response = await fetch(`${this._url}${path}`, {
                    method: "POST",
                    signal: controller.signal,
                    headers: this.makeHeaders(isFile, jsonFormat),
                    body: jsonFormat ? JSON.stringify(body) : body
                });
                // this.removeFromActiveRequests(path)
                let result: any = await response.json();
                if (!response.ok) throw new Error(result.message);
                if (response.status === 401) {
                    AuthController.getInstance().setToken(null);
                    throw new Error("No auth");
                    // this.handleUnauthenticated();
                    return;
                }

                resolve(humps(result));
            } catch (e: any) {
                reject(new Error(e.message));
            }
        });
        return promise;
    }

    private makeHeaders(isFile: boolean = false, json: boolean = false) {
        const headers: Headers = {
            'Accept': 'application/json',
        }

        if (localStorage.getItem('token')) {
          headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        }

        if (!isFile && json) headers['Content-Type'] = 'application/json'
        // else headers['Content-Type'] = 'application/json'

        return headers
    }

    private buildParams(data: Object) {
        const params = new URLSearchParams()
    
        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(value => params.append(`${key}[]`, value))
            } else {
                params.append(key, value)
            }
        });
    
        return params.toString()
    }
}

// type PostBody = {
//     [key: string]: any
// }

type GetBody = {
    [key: string]: any
}

type Headers = {
    [key: string]: any
}