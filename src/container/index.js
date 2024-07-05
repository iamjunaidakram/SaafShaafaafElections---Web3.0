import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Pakistan from "../assets/img/PakFlag.png";
import { Web3Context } from "../context/web3context";

export default function Index() {
  const { web3, account, balance, connectWallet, error, walletConnected } =
    useContext(Web3Context);

  return (
    <>
      <div className="banner-main">
        <div>
          {error && <p className="error">{error}</p>}
          <img className="pak-img" src={Pakistan} alt="" />
          {web3 ? (
            !walletConnected ? (
              <div className="wallet-section">
                <h1>Connect Your Wallet</h1>
                <button onClick={connectWallet}>Connect MetaMask</button>
              </div>
            ) : (
              <div className="account-details">
                <h1>Wallet Details</h1>
                <h2>
                  Account: <span>{account}</span>
                </h2>
                <h2>
                  Balance: <span>{balance}</span>
                </h2>
                <hr />
                <div className="btn-group">
                  <Link to="/leaders-details">
                    <button>Leaders Details</button>
                  </Link>
                  <Link to="/cast-vote">
                    <button>Cast your vote</button>
                  </Link>
                </div>
              </div>
            )
          ) : (
            <p>Please install MetaMask to use this app.</p>
          )}
        </div>
      </div>
    </>
  );
}
