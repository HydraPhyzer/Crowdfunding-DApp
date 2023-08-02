import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { MediaRenderer } from "@thirdweb-dev/react";
import { useSelector } from "react-redux";
import { useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { Link } from "react-router-dom";

const Project = () => {
  let [Add, setAdd] = useState("");
  const { id } = useParams();

  let State = useSelector((state) => state.Reducer);
  const Data = useContractRead(State?.Contract, "AllCompaigns", [`${id}`], {
    from: Add,
  });
  const Donors = useContractRead(State?.Contract, "GetDonors", [`${id}`], {
    from: Add,
  });
  let [Load, setLoad] = useState(false);

  console.log(Data?.data);
  console.log(Donors?.data);
  useEffect(() => {
    let GetAdd = async () => {
      setAdd(await State?.Metamask?.getAddress());
    };
    State?.Contract && GetAdd();
  }, [State?.Contract]);

  const { mutateAsync: EndCompaign, isLoading: Loader2 } = useContractWrite(
    State?.Contract,
    "EndCompaign",
    {
      from: Add,
    }
  );
  const { mutateAsync: Donate, isLoading: Loader1 } = useContractWrite(
    State?.Contract,
    "Donate"
  );

  let DonateNow = async () => {
    try {
      const data = await Donate({ args: [id] });
      alert("Donation Success");
      setLoad(!Load);
    } catch (err) {
      alert("Something Went Wrong");
    }
  };
  let Abort = async () => {
    try {
      if (Data?.data[5] == Add) {
        const data = await EndCompaign({ args: [id] });
        alert("Contract Deleted Success");
        setLoad(!Load);
      } else {
        alert("Your Are Not Owner of This Compaign");
      }
    } catch (err) {
      alert("Something Went Wrong");
    }
  };

  useEffect(() => {}, [Load]);

  return (
    <div>
      <section className="flex flex-col justify-between h-[100vh]">
        <section className="h-[10%] m-2">
          <Header />
        </section>
        <section className="m-2 bg-[#34495e] text-white p-2 rounded-sm shadow-md backdrop-filter backdrop-blur-xl bg-opacity-60 border-[1px] border-gray-500 h-[100%] flex justify-between items-center gap-5">
          <Link
            to="/"
            className="p-2 bg-green-500 rounded-md outline-none flex justify-center items-center absolute top-0 left-0 m-2"
          >
            Home
          </Link>
          <div className="w-[50%] flex flex-col gap-5">
            <MediaRenderer
              src={Data?.data && Data?.data[2]}
              className="object-cover rounded-md"
              height="50%"
              width="30%"
            />
            <div>
              <p>List of Those Who Donates</p>
              <ul className="h-[20vh] overflow-y-scroll">
                {Donors?.data && Donors?.data.length > 0 ? (
                  Donors?.data?.map((Each, Ind) => {
                    return <li key={Ind}>{Each}</li>;
                  })
                ) : (
                  <p className="text-gray-400">No Donors For Now</p>
                )}
              </ul>
            </div>
          </div>
          <div className="flex flex-col w-[50%] gap-5">
            <input
              type="text"
              className="bg-[#34495e] rounded-md p-3 outline-none"
              readOnly={true}
              value={Data?.data && "Name : " + Data?.data[0]}
            />
            <input
              type="text"
              className="bg-[#34495e] rounded-md p-3 outline-none"
              readOnly={true}
              value={Data?.data && "Story : " + Data?.data[1]}
            />
            <input
              type="text"
              className="bg-[#34495e] rounded-md p-3 outline-none"
              readOnly={true}
              value={Data?.data && "Target : " + Data?.data[3]}
            />
            <input
              type="text"
              className="bg-[#34495e] rounded-md p-3 outline-none"
              readOnly={true}
              value={Data?.data && "Total : " + Data?.data[7]}
            />
            {Loader1 ? (
              <div
                role="status"
                className="p-2 bg-green-500 rounded-md outline-none flex justify-center items-center"
              >
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <button
                className="p-3 bg-green-500 rounded-md outline-none"
                onClick={DonateNow}
                disabled={Data?.data && Data?.data[6] == false ? true : false}
              >
                Donate
              </button>
            )}
            {Loader2 ? (
              <div
                role="status"
                className="p-2 bg-green-500 rounded-md outline-none flex justify-center items-center"
              >
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <button
                className="p-3 bg-red-500 rounded-md outline-none"
                onClick={Abort}
                disabled={Data?.data && Data?.data[6] == false ? true : false}
              >
                Abort Compaign
              </button>
            )}
          </div>
        </section>
        <section className="h-[10%] m-2">
          <Footer />
        </section>
      </section>
    </div>
  );
};

export default Project;
