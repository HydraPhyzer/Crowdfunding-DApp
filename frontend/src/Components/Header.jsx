import React, { useEffect, useState } from "react";
import { useMetamask } from "@thirdweb-dev/react";
import {useSelector,useDispatch} from "react-redux"
import { useContract } from "@thirdweb-dev/react";

const Header = () => {
  const connectWithMetamask = useMetamask();
  let [HeadState, setHeadState] = useState({
    Address: null,
    Balance: null,
  });
  let Dispatch=useDispatch();

  
  let {contract}=useContract(`${import.meta.env.VITE_CONTRACT_ADDRESS}`)
  let ConnectWallet = async () => {
    connectWithMetamask().then(async (res) => {
      Dispatch({type:"SetMetamask",payload:res})
      Dispatch({type:"SetContract",payload:contract})

      setHeadState({
        ...HeadState,
        Address: await res?.getAddress(),
        Balance: await res?.getBalance(),
      });
    });
  };

  useEffect(() => {
    ConnectWallet();
  },[]);

  return (
    <div className="bg-[#34495e] p-2 text-white rounded-sm shadow-md flex justify-between items-center backdrop-filter backdrop-blur-xl bg-opacity-60 border-[1px] border-gray-500">
      <p className="font-medium">Crowdfunding DApp</p>
      <p className="bg-green-500 p-2 rounded-[5px]">
        Account : <span>{HeadState?.Address}</span>{" "}
        <span className="text-black">||</span> Balance{" "}
        <span>
          {HeadState?.Balance?.displayValue?.slice(0, 5)}{" "}
          <span className="text-red-500">{HeadState?.Balance?.symbol}</span>
        </span>
      </p>
    </div>
  );
};

export default Header;
