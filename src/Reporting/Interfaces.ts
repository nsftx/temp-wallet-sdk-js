import { Environment, Channel } from '../Common/Enums';
import { AuthType } from '../Security/Enums';
import { ReportingTransactionType, ReportingBonusIdentifier } from './Enums';
import { AuthAccessKeyOptions, AuthBearerOptions } from '../Security/Interfaces';

export interface ReportingClientOptions {
  environment: Environment;
  authType: AuthType;
  authOptions: AuthAccessKeyOptions | AuthBearerOptions;
}

export interface ReportingTransactionBonus {
  id: ReportingBonusIdentifier;
}

export interface ReportingTransactionSource {
  operatorId?: string;
  playerId?: string;
  betshopId?: string;
  deviceId?: string;
  cashRegisterId: string;
}

export interface ReportingCreateTransactionArgs {
  id: string;
  tenantUuid: string;
  ticketId?: string;
  barcode: string;
  type: ReportingTransactionType;
  amount: number;
  tax: number;
  realPercentage: number;
  channel: Channel;
  productId: string;
  timestamp: number;
  source: ReportingTransactionSource;
  payinSource?: ReportingTransactionSource;
  bonus?: ReportingTransactionBonus;
}

export interface ReportingFilters {
  tenantUuid: string;
  dateFrom: string;
  dateTo: string;
  dateGroup?: string;
  locationUuid?: Array<string>;
  products?: Array<string>;
  channels?: Array<string>;
}
