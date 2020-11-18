import { assign } from 'lodash';
import { ReportingClient } from './ReportingClient';
import { ReportingClientOptions, ReportingFilters, ReportingCreateTransactionArgs } from './Interfaces';
import { ResponseMessage, ResponseErrorMessage } from '../Common';
import { GenericResponse } from '../Common/Types';

export class Report {
  private client: ReportingClient;

  constructor(clientOptions: ReportingClientOptions) {
    this.client = new ReportingClient(clientOptions);
  }

  async createTransaction(data: ReportingCreateTransactionArgs): GenericResponse {
    try {
      assign(data, {
        companyId: data.tenantUuid,
      });

      const result = await this.client.post('/v1/transactions', data, {
        headers: {
          'Authorization': this.client.getAuthorization(),
          'Content-Type': 'application/json',
          'X-Nsft-Seven-Company-Uuid': data.tenantUuid,
        },
      });

      return new ResponseMessage(
        result.data,
        result.status,
      );
    } catch (error) {
      return new ResponseErrorMessage(error.response);
    }
  }

  async getProducts(filters: ReportingFilters): GenericResponse {
    try {
      const result = await this.client.get('/v2/reports/product/summary', {
        headers: {
          'Authorization': this.client.getAuthorization(),
          'X-Nsft-Seven-Company-Uuid': filters.tenantUuid,
        },
        params: {
          /* eslint @typescript-eslint/camelcase: "off" */
          date_from: filters.dateFrom,
          date_to: filters.dateTo,
          date_group: filters.dateGroup,
          products: filters.products,
          channels: filters.channels,
        },
      });

      return new ResponseMessage(
        result.data,
        result.status,
        result.data,
      );
    } catch (error) {
      return new ResponseErrorMessage(error.response);
    }
  }

  async getLocationSummary(filters: ReportingFilters): GenericResponse {
    try {
      const result = await this.client.get('/v1/location/summary', {
        headers: {
          'Authorization': this.client.getAuthorization(),
          'X-Nsft-Seven-Company-Uuid': filters.tenantUuid,
        },
        params: {
          /* eslint @typescript-eslint/camelcase: "off" */
          date_from: filters.dateFrom,
          date_to: filters.dateTo,
          location_uuid: filters.locationUuid,
        },
      });

      return new ResponseMessage(
        result.data,
        result.status,
        result.data,
      );
    } catch (error) {
      return new ResponseErrorMessage(error.response);
    }
  }
}
