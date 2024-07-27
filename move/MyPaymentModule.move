module MyPaymentModule {
    use aptos_framework::coin::{Coin, transfer};
    use aptos_framework::aptos_account::AptosAccount;

    public fun pay(sender: &signer, recipient: address, amount: u64) {
        transfer<AptosAccount>(sender, recipient, amount);
    }
}
