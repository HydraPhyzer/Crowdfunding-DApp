import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import { useSelector } from "react-redux";
import { useContractRead } from "@thirdweb-dev/react";
import { MediaRenderer } from "@thirdweb-dev/react";
import { Link } from "react-router-dom";

const Account = () => {
  let [Add, setAdd] = useState("");

  let State = useSelector((state) => state.Reducer);
  const Data = useContractRead(State?.Contract, "GetAccount", [], {
    from: Add,
  });

  useEffect(() => {
    let GetAdd = async () => {
      setAdd(await State?.Metamask?.getAddress());
    };
    State?.Contract && GetAdd();
  }, [State?.Contract]);

  return (
    <div>
      <section className="flex flex-col justify-between h-[100vh]">
        <section className="h-max m-2">
          <Header />
        </section>
        <section className="m-2 bg-[#34495e] text-white p-2 rounded-sm shadow-md backdrop-filter backdrop-blur-xl bg-opacity-60 border-[1px] border-gray-500 h-[100%] sm:flex sm:justify-center flex sm:flex-row flex-col items-center">
          <Link
            to="/"
            className="p-2 bg-green-500 rounded-md outline-none flex justify-center items-center absolute top-0 left-0 m-2"
          >
            Home
          </Link>
          {Data?.data && (
            <React.Fragment>
              <MediaRenderer
                src={Data?.data[2]}
                className="object-cover"
                height="50%"
                width="30%"
              />
              <div className="flex flex-col gap-5 ">
                <input
                  type="text"
                  className="p-2 outline-none bg-[#34495e] px-5 rounded-md mx-5"
                  disabled
                  value={Data?.data[0]}
                />
                <input
                  type="text"
                  className="p-2 outline-none bg-[#34495e] px-5 rounded-md mx-5"
                  disabled
                  value={Data?.data[1]}
                />
                <input
                  type="text"
                  className="p-2 outline-none bg-[#34495e] px-5 rounded-md mx-5"
                  disabled
                  value={Data?.data[3]}
                />
              </div>
            </React.Fragment>
          )}
        </section>
        <section className="h-[10%] m-2">
          <Footer />
        </section>
      </section>
    </div>
  );
};

export default Account;
