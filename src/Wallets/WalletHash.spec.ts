import { WalletHash } from './WalletHash';

describe('WalletHash', () => {
  it('should produce valid signature', () => {
    const walletHash = new WalletHash(
      'Roulette',
      'secret',
    );

    const signatureTarget = 'ce6243fd80fcb82f28c574d6dc96f391';

    const signature = walletHash.getSignature([{ uuid: '08e9e088-6ee7-43de-a42f-3f1e59af10b8' }], {
      thirdPartyToken: undefined,
      cashPayment: true,
      cashRegister: '08e9e088-6ee7-43de-a42f-3f1e59af10b8',
      userUuid: '485251bc-73ea-4d20-9903-d35d15044130',
    });

    expect(signature).toEqual(signatureTarget);
  });
});
