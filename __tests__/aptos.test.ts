// __tests__/aptos.test.ts
import { AptosAccount, TxnBuilderTypes, BCS } from 'aptos';
import { submitTransaction } from '@/lib/aptos/aptos';

jest.mock('aptos', () => ({
  AptosClient: jest.fn().mockImplementation(() => ({
    generateTransaction: jest.fn(),
    signTransaction: jest.fn(),
    submitTransaction: jest.fn().mockResolvedValue({ hash: 'mockHash' }),
    waitForTransaction: jest.fn(),
  })),
  AptosAccount: jest.fn().mockImplementation(() => ({
    address: () => '0x1',
  })),
  TxnBuilderTypes: {
    TransactionPayloadEntryFunction: jest.fn().mockImplementation(() => ({})),
    EntryFunction: {
      natural: jest.fn(),
    },
    AccountAddress: {
      fromHex: jest.fn().mockReturnValue({}),
    },
  },
  BCS: {
    bcsToBytes: jest.fn(),
    bcsSerializeUint64: jest.fn(),
  },
}));

describe('Aptos integration', () => {
  it('should submit a transaction successfully', async () => {
    const sender = new AptosAccount();
    const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
      TxnBuilderTypes.EntryFunction.natural(
        '0x1::Coin',
        'transfer',
        [],
        [
          BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex('0x2')),
          BCS.bcsSerializeUint64(1000)
        ]
      )
    );

    const result = await submitTransaction(sender, payload);

    expect(result.hash).toBe('mockHash');
  });
});
