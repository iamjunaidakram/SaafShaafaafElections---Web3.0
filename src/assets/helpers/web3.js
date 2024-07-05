import Web3 from "web3";
import { toast } from "react-toastify";
import ElectionContractABI from "../../contracts/SaafShaafaafElections.json";

// Election Contract Address
const electionContractAddress = "0x5D722306C9818d47553F99342E7F539439Badf87";

// Get web3 instance
export const getWeb3 = async () => {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum);
      return web3;
    } else {
      toast.error(
        "MetaMask is not installed. Please install it to use this app."
      );
    }
  } catch (err) {
    toast.error(err?.message || err);
  }
};

// Connect With Metamask
export const connectWithMetamask = async () => {
  try {
    let web3 = await getWeb3();
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    let accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      return accounts[0];
    }
    return false;
  } catch (err) {
    toast.error(err?.message || err);
    throw new Error(err);
  }
};

// Get Account Balance
export const getAccountBalance = async (account) => {
  try {
    let web3 = await getWeb3();
    return await web3.eth.getBalance(account);
  } catch (err) {
    toast.error(err?.message || err);
  }
};

// Get Contract
export const getContract = (web3, contractABI, contractAddress) => {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  console.log("contract", contract);
  return contract;
};

// Get Election Contract
export const getElectionContract = (web3) => {
  const electionContract = getContract(
    web3,
    ElectionContractABI,
    electionContractAddress
  );
  return electionContract;
};
