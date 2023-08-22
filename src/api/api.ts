import humps from "lodash-humps-ts";
import { ServerResponseError } from "@/interfaces/errors";
import AuthController from "@/services/Auth"

declare global {
  interface Window {
    updateConfig: any;
  }
}
window.updateConfig = () => {
    ApiService.getInstance().updateConfig();
}

export default class ApiService {
    private savedRequest: null | { 
        path: string, 
        type: string,
        params: any,
        file: boolean
    } = null;
    private config = {
        'domain': import.meta.env.VITE_API_URL,
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Token': localStorage.getItem('ltoken')!,
        },
        'defaultTimeout': 3000,
    };

    public updateConfig() {
        this.config = {
            'domain': import.meta.env.VITE_API_URL,
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Token': localStorage.getItem('ltoken')!,
            },
            'defaultTimeout': 3000,
        };
    }

    private static instance?: ApiService;

    private constructor() {
    }

    static getInstance() {
        if (typeof ApiService.instance === 'undefined') {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    async tryRefreshToken() {

    }

    get = async (path = "/", data = {}) => {
        let url = this.config.domain + path;
        if (Object.keys(data).length !== 0) url += '?' + new URLSearchParams(data).toString();

        let response: Response = await fetch(url, {
            method: "GET",
            headers: this.config.headers,
        });
        if (response.ok === false) {
            if (response.status === 401) {
                if (localStorage.getItem('lrefreshToken') && localStorage.getItem('csp')) {
                    this.savedRequest = {
                        path: path,
                        type: "GET",
                        params: data,
                        file: false
                    };
                    return await this.refreshToken(localStorage.getItem('csp')!, localStorage.getItem('lrefreshToken')!);
                } else {
                  AuthController.getInstance().setToken(null);
                }
            }
            const json: { code: number, error: string } = await response.json();
            // TODO: настроить типы ошибок
            // @ts-ignore
            throw new ServerResponseError(json.error, json.code);
        }

        const json: { data: object } = await response.json();
        return humps(json.data);
    }
    post = async (path = "/", data: any, file: boolean = false) => {
        let url = this.config.domain + path;
        let response = await fetch(url, {
            method: "POST",
            headers: file ? {'X-Token': localStorage.getItem('ltoken')!} : this.config.headers,
            body: file ? data : JSON.stringify(data)
        });

        if (response.ok === false) {
            if (response.status === 401) {
                if (localStorage.getItem('lrefreshToken') && localStorage.getItem('csp')) {
                    this.savedRequest = {
                        path: path,
                        type: "POST",
                        params: data,
                        file: false
                    };
                    return await this.refreshToken(localStorage.getItem('csp')!, localStorage.getItem('lrefreshToken')!);
                } else {
                  AuthController.getInstance().setToken(null);
                }
            }
            const json: { code: number, error: string, ban: { comment: string, unban_at: string } } = await response.json();
            // @ts-ignore

            // if (json.code === 10078) {
            //     await store.dispatch('fetchAccount', null);
            //     const account: Account = store.getters['account'].value;
            //     const message: Message = {
            //         title: 'Вы заблокированы',
            //         text: json.ban.comment,
            //         extra: `Дата разблокировки: ${getDateString(new Date(json.ban.unban_at))}`,
            //         type: MessageType.error
            //     }
            //     await store.dispatch('setMessage', message);
            //     f7.view.main.router.navigate('/message', {transition: 'f7-fade'});
            // }

            throw new ServerResponseError(json.error, json.code);
        }

        const json: { data: object } = await response.json();

        return humps(json.data);
    }
    patch = async (path = "/", data = {}) => {
        let url = this.config.domain + path;
        let response = await fetch(url, {
            method: "PATCH",
            headers: this.config.headers,
            body: JSON.stringify(data)
        });


        if (!response.ok) {
            if (response.status === 401) {
                if (localStorage.getItem('lrefreshToken') && localStorage.getItem('csp')) {
                    this.savedRequest = {
                        path: path,
                        type: "PATCH",
                        params: data,
                        file: false
                    };
                    return await this.refreshToken(localStorage.getItem('csp')!, localStorage.getItem('lrefreshToken')!);
                } else {
                  AuthController.getInstance().setToken(null);
                }
            }
            const json: { code: number, error: string } = await response.json();
            // @ts-ignore
            throw new ServerResponseError(json.error, json.code);
        }

        const json: { data: object } = await response.json();

        return humps(json.data);
    }
    postWithFile = async (path = "/", data: FormData) => {
        // let url = this.config.domain + path;
        let response = await fetch('https://api.lanpay.cc/api/mobile/client/report/upload', {
            method: "POST",
            headers: {
                'X-Token': localStorage.getItem('ltoken')!,
            },
            body: data
        });

        if (!response.ok) {
            if (response.status === 401) {
                if (localStorage.getItem('lrefreshToken') && localStorage.getItem('csp')) {
                    this.savedRequest = {
                        path: path,
                        type: "POST",
                        params: data,
                        file: true
                    };
                    return await this.refreshToken(localStorage.getItem('csp')!, localStorage.getItem('lrefreshToken')!);
                } else {
                  AuthController.getInstance().setToken(null);
                }
            }
            const json: { code: number, error: string } = await response.json();
            // @ts-ignore
            throw new ServerResponseError(json.error, json.code);
        }

        const json: { data: object } = await response.json();

        return humps(json.data);
    }

    refreshToken = async (csp: string, refreshToken: string): Promise<any> => {
        let url = this.config.domain + '/auth/refresh';
        let response: any = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Csp': csp
            },
            body: JSON.stringify({ refresh_token: refreshToken })
        });
        if (response.ok !== false) {
            response = await response.json();
            localStorage.setItem('ltoken', response.access_token);
            localStorage.setItem('lrefreshToken', response.refresh_token);
            this.updateConfig();
            if (this.savedRequest) {
                const { path, type, params } = this.savedRequest;
                if (type === "GET") {
                    return await this.get(path, params);
                }
                if (type === "POST") {
                    return await this.post(path, params);
                }
                if (type === "PATCH") {
                    return await this.patch(path, params);
                }
            }
        } else {
          AuthController.getInstance().setToken(null);
        }
    }
}
