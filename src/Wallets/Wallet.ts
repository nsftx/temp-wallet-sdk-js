import { merge, omit } from 'lodash';
import { WalletClient } from './WalletClient';
import { ResponseMessage, ResponseErrorMessage } from '../Common';
import { GenericResponse } from '../Common/Types';

import {
  WalletClientOptions,
  WalletCashArgs,
  WalletCreditArgs,
  WalletDebitArgs,
  WalletDebitRevertArgs,
  WalletPaymentArgs,
  WalletRequestArgs,
} from './Interfaces';

export class Wallet {
  private client: WalletClient;

  constructor(clientOptions: WalletClientOptions) {
    this.client = new WalletClient(clientOptions);
  }

  async debit(data: WalletDebitArgs, request: WalletRequestArgs, cashData?: WalletCashArgs): GenericResponse {
    try {
      const config = this.client.getConfig(request, data.paymentId);
      const payload = merge({}, data, cashData);
      const result = await this.client.post('/payments/debit', payload, config);

      return new ResponseMessage(
        result.data,
        result.status,
        omit(result.data, 'code'),
      );
    } catch (error) {
      return new ResponseErrorMessage(error.response);
    }
  }

  async confirm(data: WalletPaymentArgs, request: WalletRequestArgs): GenericResponse {
    try {
      const config = this.client.getConfig(request, data.paymentId);
      const result = await this.client.post('/payments/confirm', data, config);

      return new ResponseMessage(
        result.data,
        result.status,
        omit(result.data, 'code'),
      );
    } catch (error) {
      return new ResponseErrorMessage(error.response);
    }
  }

  async debitCancel(data: WalletPaymentArgs, request: WalletRequestArgs): GenericResponse {
    try {
      const config = this.client.getConfig(request, data.paymentId);
      const result = await this.client.post('/payments/cancel', data, config);

      return new ResponseMessage(
        result.data,
        result.status,
        omit(result.data, 'code'),
      );
    } catch (error) {
      return new ResponseErrorMessage(error.response);
    }
  }

  async debitRevert(data: WalletDebitRevertArgs, request: WalletRequestArgs): GenericResponse {
    try {
      const config = this.client.getConfig(request, data.paymentId);
      const result = await this.client.post('/payments/debit/revert', data, config);

      return new ResponseMessage(
        result.data,
        result.status,
        omit(result.data, 'code'),
      );
    } catch (error) {
      return new ResponseErrorMessage(error.response);
    }
  }

  async credit(data: WalletCreditArgs, request: WalletRequestArgs): Promise<any> {
    try {
      const config = this.client.getConfig(request, data.paymentId);
      const result = await this.client.post('/payments/credit', data, config);

      return new ResponseMessage(
        result.data,
        result.status,
        omit(result.data, 'code'),
      );
    } catch (error) {
      return new ResponseErrorMessage(error.response);
    }
  }

  async closePayments(tenantUuid: string, payments: Array<string>, request: WalletRequestArgs): GenericResponse {
    try {
      const config = this.client.getConfig(request);
      const result = await this.client.post('/payments-close', {
        groupUuid: tenantUuid,
        paymentUuids: payments,
      }, config);

      return new ResponseMessage(
        result.data,
        result.status,
        omit(result.data, 'code'),
      );
    } catch (error) {
      return new ResponseErrorMessage(error.response);
    }
  }

  async getPayment(paymentUuid: string, request: WalletRequestArgs): GenericResponse {
    try {
      const config = this.client.getConfig(request);
      const result = await this.client.get(`/payments/${paymentUuid}`, config);

      return new ResponseMessage(
        result.data,
        result.status,
        result.data,
      );
    } catch (error) {
      return new ResponseErrorMessage(error.response);
    }
  }

  async getBalance(userUuid: string, request: WalletRequestArgs): GenericResponse {
    try {
      const config = this.client.getConfig(request);
      const result = await this.client.get(`/payments/balance/${userUuid}`, config);

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
