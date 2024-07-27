import Link from 'next/link';
import { useState } from 'react';
import { AptosClient } from 'aptos';

export default function PopupBid({ isModal, handleModal }) {
    const [walletAddress, setWalletAddress] = useState("");
    const [error, setError] = useState(null);

    const connectWallet = async () => {
        if (typeof window.aptos === 'undefined') {
            setError("Aptos wallet extension is not installed.");
            return;
        }

        try {
            // Request account from Aptos wallet extension
            const response = await window.aptos.connect();
            const account = await window.aptos.account();
            setWalletAddress(account.address);
            console.log("Connected with Aptos Wallet:", account.address);
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error("Error connecting to wallet:", err);
            setError("Failed to connect to the wallet. Please try again.");
        }
    };

    return (
        <>
            <div className={`modal fade popup ${isModal ? "show d-block" : ""}`} id="popup_bid" tabIndex={-1} aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <a onClick={handleModal} className="btn-close" data-dismiss="modal"><i className="fal fa-times" /></a>
                            <h3>Connect Your Wallet</h3>
                            <p className="sub-heading">Select what network and wallet you want to connect below</p>
                            <div className="tf-wallet" onClick={connectWallet}>
                                <div className="image">
                                    <img src="/assets/images/logo/aptos_logo.webp" alt="Wallet Image" />
                                </div>
                                <div className="content">
                                    <div className="title">Aptos Wallet</div>
                                    <div className="sub">Connect to your Aptos wallet</div>
                                </div>
                            </div>
                            <div className="bottom">
                                By connecting your wallet, you agree to our <Link href="#">Terms of Service</Link> and our <Link href="#">Privacy Policy.</Link>
                            </div>
                            {walletAddress && <div className="connected-wallet">Connected Wallet: {walletAddress}</div>}
                            {error && <div className="error-message">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
            {isModal && <div className="modal-backdrop fade show" onClick={handleModal} />}
        </>
    );
}
