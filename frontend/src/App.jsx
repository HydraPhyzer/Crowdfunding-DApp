import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import { useMetamask } from "@thirdweb-dev/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";

const App = () => {
  const connectWithMetamask = useMetamask();
  const { contract } = useContract(`${import.meta.env.VITE_CONTRACT_ADDRESS}`);

  const [State, setState] = useState({
    Contract: null,
    Metamask: null,
  });

  let ConnectWallet = async () => {
    connectWithMetamask().then(async (res) => {
      setState({ ...State, Metamask: res, Contract: contract });
    });
  };
  console.log(State)

  return (
    <section className="m-2">
      <Header Func={ConnectWallet} State={State} />
    </section>
  );
};

export default App;
