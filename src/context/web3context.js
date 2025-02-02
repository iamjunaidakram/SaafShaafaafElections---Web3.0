// src/context/Web3Context.js

import React, { createContext, useState, useEffect } from "react";
import {
  getWeb3,
  connectWithMetamask,
  getAccountBalance,
} from "../assets/helpers/web3";

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        web3Instance && setWeb3(web3Instance);
        // const chainId = await web3Instance.eth.getChainId();
      } catch (error) {
        console.error("Failed to load web3", error);
      }
    };
    initWeb3();
  }, []);

  const connectWallet = async () => {
    try {
      const account = await connectWithMetamask();
      setAccount(account);
      getBalance(account);
      setWalletConnected(true)
    } catch (err) {
      setError("Failed to connect to MetaMask");
    }
  };

  const getBalance = async (account) => {
    if (web3) {
      const balance = await getAccountBalance(account);
      setBalance(web3.utils.fromWei(balance, "ether"));
    }
  };

  return (
    <Web3Context.Provider
      value={{ web3, account, balance, connectWallet, error, walletConnected }}
    >
      {children}
    </Web3Context.Provider>
  );
};
