import { Environment, DataCenter } from '../Common/Enums';
import { AuthAccessKeyOptions } from '../Security/Interfaces';
import { PaymentStrategy } from './Enums';

export interface WalletClientOptions {
  environment: Environment;
  dataCenter?: DataCenter;
  authOptions: AuthAccessKeyOptions;
}

export interface WalletCashArgs {
  cashPayment: boolean;
  cashRegister: string;
  userUuid: string;
  userUsername?: string;
  userEmail?: string;
}

export interface WalletSecurityArgs {
  thirdPartyToken?: string;
  cashPayment?: boolean;
  cashRegister?: string;
  userUuid?: string;
}

export interface WalletMoneyArgs {
  subtotal: number;
  taxApplied: number;
  total: number;
}

export interface WalletPaymentArgs {
  paymentId: string;
  productHash?: string;
}

export interface WalletRequestArgs {
  locale: string;
  uuid: string;
}

export interface WalletUserArgs {
  uuid: string;
}

export interface WalletCreditArgs {
  requests: Array<WalletUserArgs>;
  paymentStrategy?: PaymentStrategy;
  paymentId: string;
  transactionId?: string;
  openPayment?: boolean;
  amount: number;
  bonusAmount?: number;
  sourceId?: string;
  refId: string;
  productHash?: string;
  ticket: any;
  money: WalletMoneyArgs;
  loyaltyCardType?: string;
  loyaltyCardId?: string;
  clientAppSessionId?: string;
}

export interface WalletDebitArgs extends WalletCreditArgs {
  thirdPartyToken?: string;
  md5Sig: string;
}

export interface WalletDebitRevertArgs {
  accountHolder: string;
  paymentId: string;
  productHash?: string;
  money: WalletMoneyArgs;
  loyaltyCardType?: string;
  loyaltyCardId?: string;
  clientAppSessionId?: string;
}
