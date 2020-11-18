import qs from 'qs';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { merge } from 'lodash';
import { Environment } from '../Common/Enums';
import { IamClientOptions } from './Interfaces';

export class IamClient {
  private options: IamClientOptions;

  private http: AxiosInstance;

  constructor(options: IamClientOptions) {
    this.options = options;

    const endpoint = this.getEndpoint();

    this.http = axios.create({
      baseURL: endpoint,
      timeout: 5000,
    });
  }

  private getEndpoint(): string {
    switch (this.options.environment) {
      case Environment.PRODUCTION:
        return 'https://iam-am.7platform.com/api';
      case Environment.STAGING:
        return 'https://staging-iam-am.7platform.com/app.php/api';
      default:
        return 'https://dev-iam-am.7platform.com/app_dev.php/api';
    }
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
}
