export enum ReportingTransactionType {
  Payin = 'Payin',
  Cancel = 'Cancel',
  Won = 'Won',
  UndoWon = 'UndoWon',
  Payout = 'Payout',
  Expired = 'Expired',
  ExpiredCashBack = 'ExpiredCashBack',
  PayoutCashBack = 'PayoutCashBack',
  BonusWon = 'BonusWon',
  BonusExpired = 'BonusExpired',
  BonusPayout = 'BonusPayout',
}

export enum ReportingBonusIdentifier {
  WelcomeBonus = 'WelcomeBonus',
  FirstDepositBonus = 'FirstDepositBonus',
  ProductBonus = 'ProductBonus',
  RetailCashBackBonus = 'RetailCashBackBonus',
  Jackpot = 'Jackpot',
}
