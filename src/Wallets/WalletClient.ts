import qs from 'qs';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { defaultTo } from 'lodash';
import { merge } from 'lodash';
import { DateTimeUtil } from '../Utility';
import { Environment, DataCenter } from '../Common/Enums';
import { WalletClientOptions, WalletRequestArgs } from './Interfaces';
import { SapaHmacKey } from '../Security';
import { AuthAccessKeyOptions } from '../Security/Interfaces';

export class WalletClient {
  private options: WalletClientOptions;

  private http: AxiosInstance;

  private hashKey: SapaHmacKey;

  constructor(options: WalletClientOptions) {
    console.log("INVOKED WalletClient#constructor")

    this.options = options;
    this.hashKey = new SapaHmacKey(this.options.authOptions as AuthAccessKeyOptions);

    const endpointPrefix = this.getEndpointPrefix();

    this.http = axios.create({
      baseURL: `https://services${endpointPrefix}.7platform.com/api/aggregator`,
      timeout: 5000,
    });
    
    console.log(`PROPERTY WalletClient#this.http, VALUE ${this.http}`);
  }

  private getEndpointPrefix(): string {
    console.log("INVOKED WalletClient#getEndpointPrefix")
    switch (this.options.environment) {
      case Environment.PRODUCTION:{
        console.log(`CASE Environment.PRODUCTION, RETURN ${this.getEndpointDatacenterPrefix()}`)
        return this.getEndpointDatacenterPrefix();
      }
      case Environment.STAGING: {
        console.log(`CASE Environment.PRODUCTION, RETURN -staging`)
        return '-staging';
      }
      default: {
        console.log(`CASE Environment.PRODUCTION, RETURN -dev`)
        return '-dev';
      }
    }
  }

  private getEndpointDatacenterPrefix(): string {
    console.log("INVOKED WalletClient#getEndpointDatacenterPrefix")

    switch (this.options.dataCenter) {
      case DataCenter.UK: {
        console.log("CASE DataCenter.UK, RETURN empty string")
        return '';
      }
      case DataCenter.RS: {
        console.log("CASE DataCenter.RS, RETURN -rs")
        return '-rs';
      }
      default: {
        console.log(`CASE default, RETURN ${defaultTo(this.options.dataCenter, '')}`)
        return defaultTo(this.options.dataCenter, '');
      }
    }
  }

  public getAuthorization(requestUuid: string, timestamp: number): string {
    return this.hashKey.getSignature(requestUuid, timestamp);
  }

  public getConfig(request: WalletRequestArgs, paymentId?: string): AxiosRequestConfig {
    const timestamp = DateTimeUtil.getUnixTimestamp();

    const config: AxiosRequestConfig = {
      headers: {
        'Authorization': this.getAuthorization(request.uuid, timestamp),
        'X-Request-Id': request.uuid,
        'X-Nsft-Seven-Rq-Timestamp': timestamp,
        'Seven-Locale': request.locale,
        'Content-Type': 'application/json',
      },
      params: {
        paymentId: paymentId,
        requestUuid: request.uuid,
      },
    };

    return config;
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
