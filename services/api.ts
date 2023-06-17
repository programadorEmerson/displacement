import axios, { type AxiosRequestConfig, type AxiosInstance, type AxiosError } from 'axios';

import { parseCookies } from 'nookies';

export class ApiService {
  constructor (
    private readonly token = parseCookies()[`${process.env.NEXT_PUBLIC_TOKEN_PREFIX ?? 'test-dev'}`],
    private readonly apiConfig = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
    })
  ) {
    this.initConfig();
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.apiConfig.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data: T, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.apiConfig.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data: T, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.apiConfig.put<T>(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data: T, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.apiConfig.patch<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.apiConfig.delete<T>(url, config);
    return response.data;
  }

  public async interceptorsRequest (
    config: AxiosRequestConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    if (this.token && config.headers) {
      config.headers.Authorization = `Bearer ${this.token}`;
      config.headers.Accept = 'application/json';
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  }

  public async initInterceptors (): Promise<void> {
    this.apiConfig.interceptors.request.use(this.interceptorsRequest.bind(this));
    this.apiConfig.interceptors.response.use(undefined, async (error: AxiosError) => {
      if (error.response?.status !== 200) {
        return await Promise.reject(error);
      }
    });
  }

  public async initConfig (): Promise<AxiosInstance> {
    await this.initInterceptors();
    return this.apiConfig;
  }

  public getApiToken (): string {
    return this.token;
  }
}
