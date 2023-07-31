import React, { useEffect, useState } from "react";

const Header = ({ Func, State }) => {
  let [HeadState, setHeadState] = useState({
    Address: null,
    Balance: null,
  });

  useEffect(() => {
    let SetValues = async () => {
      setHeadState({
        ...HeadState,
        Address: await State?.Metamask?.getAddress(),
        Balance: await State?.Metamask?.getBalance(),
      });
    };
    State?.Metamask && SetValues();
  }, [State?.Metamask]);

  return (
    <div className="bg-[#34495e] p-2 text-white rounded-sm shadow-md flex justify-between items-center backdrop-filter backdrop-blur-xl bg-opacity-60 border-[1px] border-gray-500">
      <p className="font-medium">Crowdfunding DApp</p>
      {State?.Metamask && HeadState ? (
        <p className="bg-green-500 p-2 rounded-[5px]">
          Account : <span>{HeadState?.Address}</span>{" "}
          <span className="text-black">||</span> Balance {" "}
          <span>
            {HeadState?.Balance?.displayValue?.slice(0, 5)}{" "}
            <span className="text-red-500">{HeadState?.Balance?.symbol}</span>
          </span>
        </p>
      ) : (
        <button className="Red" onClick={Func}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Header;
