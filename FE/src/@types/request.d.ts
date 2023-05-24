// User 타입 선언
declare module "AxiosRequest" {
  export type RequestObj = {
    url: string,
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    body?: object,
    headerObj?: object
  }
	export type useAxiosParmas = {
    tryHandler?: (response: AxiosResponse) => void,
    catchHandler?: (error: number) => void,
    finallyHandler?: () => void,
    baseURL: string
  }
}