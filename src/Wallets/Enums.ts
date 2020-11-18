export enum WalletResponseCode {
  OK = 'OK',
  INVALID_REQUEST = 'INVALID_REQUEST',
  PAYMENT_ID_NOT_FOUND = 'PAYMENT_ID_NOT_FOUND',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  SAME_LOCATION_PAYOUT_RESTRICTION = 'SAME_LOCATION_PAYOUT_RESTRICTION',
  ACCOUNT_RESTRICTION_LIMIT_REACHED = 'ACCOUNT_RESTRICTION_LIMIT_REACHED',
  RESOURCE_LIMIT_REACHED = 'RESOURCE_LIMIT_REACHED',
  ERROR = 'ERROR',
  TPP_PLAYER_ERROR = 'TPP_PLAYER_ERROR',
  TPP_SESSION_ERROR = 'TPP_SESSION_ERROR',
  TPP_TRANSACTION_ERROR = 'TPP_TRANSACTION_ERROR',
  TPP_LOGIN_ERROR = 'TPP_LOGIN_ERROR',
  TPP_BONUS_ERROR = 'TPP_BONUS_ERROR',
  TPP_TICKET_ERROR = 'TPP_TICKET_ERROR',
  TPP_GAME_ERROR = 'TPP_GAME_ERROR',
}

export enum PaymentStrategy {
  StrictSingle = 1,
  FlexibleMulti = 2,
}