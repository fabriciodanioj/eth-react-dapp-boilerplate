import { useEffect, useState } from "react";
import Web3 from "web3";

const useWeb3 = () => {
  const [userAddress, setUserAddress] = useState("");

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function getUserAddress() {
    await loadWeb3();

    const accounts = await window.web3.eth.getAccounts();
    if (accounts) {
      setUserAddress(accounts[0]);
      return accounts[0];
    } else {
      console.log("Failed to connect to an account, try logging in again!");
    }
  }

  async function loadContract(_contract) {
    await loadWeb3();

    let contract = null;

    const networkId = await window.web3.eth.net.getId();
    const networkData = _contract.networks[networkId];
    if (networkData) {
      contract = await window.web3.eth.Contract(
        _contract.abi,
        networkData.address
      );

      console.log(contract);

      return contract;
    } else {
      window.alert("SocialNetwork contract not deployed to detected network");
    }
  }

  useEffect(() => {
    loadWeb3();
    getUserAddress();
  }, [userAddress]);

  return {
    loadContract,
    userAddress,
  };
};

export default useWeb3;
