import qs from 'qs';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { merge } from 'lodash';
import { Environment } from '../Common/Enums';
import { ReportingClientOptions } from './Interfaces';
import { AccessKey } from '../Security';
import { AuthType } from '../Security/Enums';
import { AuthAccessKeyOptions, AuthBearerOptions } from '../Security/Interfaces';

export class ReportingClient {
  private options: ReportingClientOptions;

  private http: AxiosInstance;

  constructor(options: ReportingClientOptions) {
    this.options = options;

    const endpointPrefix = this.getEndpointPrefix();
    const endpointSuffix = this.getEndpointSuffix();

    this.http = axios.create({
      baseURL: `https://${endpointPrefix}-platform-reporting${endpointSuffix}.7platform.com/api`,
      timeout: 5000,
    });
  }

  private getEndpointPrefix(): string {
    switch (this.options.environment) {
      case Environment.PRODUCTION:
        return 'prod';
      case Environment.STAGING:
        return 'staging';
      default:
        return 'dev';
    }
  }

  private getEndpointSuffix(): string {
    switch (this.options.environment) {
      case Environment.PRODUCTION:
        return '-lb';
      case Environment.STAGING:
        return '';
      default:
        return '';
    }
  }

  public getAuthorization(): string {
    if (this.options.authType === AuthType.AccessKey) {
      return new AccessKey(this.options.authOptions as AuthAccessKeyOptions).getSignature();
    }

    return (this.options.authOptions as AuthBearerOptions).token;
  }

  public get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<object>> {
    return this.http.get(url, merge({
      paramsSerializer: (params: object) => {
        return qs.stringify(params, {
          arrayFormat: 'brackets',
          encodeValuesOnly: true,
        });
      },
    }, config));
  }

  public post(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<object>> {
    return this.http.post(url, data, config);
  }
}
