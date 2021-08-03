import React from "react";

import useWeb3 from "./hooks/useWeb3";

import ExampleContract from "./abis/Example.json";

import Header from "./components/Header";

function App() {
  const { loadContract, userAddress } = useWeb3();

  const [contractName, setContractName] = React.useState("");


  async function getContractData() {
    const exampleContract = await loadContract(ExampleContract);

    try {
      const contractName = await exampleContract.methods.name().call();

      setContractName(contractName);
    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => {
    getContractData();
  }, []);

  return (
    <div className="flex flex-1 flex-col min-w-screen bg-black min-h-screen font-body text-primary">
      <Header address={userAddress} />
      <div className="flex flex-1 flex-col p-10">
        <h2>Contract name: {contractName}</h2>
      </div>
    </div>
  );
}

export default App;
