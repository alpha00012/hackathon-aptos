import { AptosClient, AptosAccount, TxnBuilderTypes, BCS, HexString } from 'aptos';

const NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";
const client = new AptosClient(NODE_URL);

export async function getAccountResources(accountAddress: string) {
    return await client.getAccountResources(accountAddress);
}

export async function submitTransaction(sender: AptosAccount, payload: TxnBuilderTypes.TransactionPayloadEntryFunction) {
    const txnRequest = await client.generateTransaction(sender.address(), payload);
    const signedTxn = await client.signTransaction(sender, txnRequest);
    const transactionRes = await client.submitTransaction(signedTxn);
    await client.waitForTransaction(transactionRes.hash);
    return transactionRes;
}
