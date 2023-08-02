import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useContractWrite,
  useStorageUpload,
  useContractRead,
  MediaRenderer,
} from "@thirdweb-dev/react";

const Body = () => {
  let [Menu, setMenu] = useState("All");
  let [File, setFile] = useState(null);
  let [FileURL, setFileURL] = useState(null);
  let [Add, setAdd] = useState("");

  let [Name, SetName] = useState("");
  let [Desc, SetDesc] = useState("");
  let [Target, SetTarget] = useState("");

  let State = useSelector((state) => state.Reducer);
  const { mutateAsync: CreateCompaign, isLoading } = useContractWrite(
    State?.Contract,
    "CreateCompaign"
  );
  const Data = useContractRead(State?.Contract, "GetUserCompaigns", [], {
    from: Add,
  });
  const AllCmps = useContractRead(State?.Contract, "GetAllCompaigns", [], {
    from: Add,
  });
  const { mutateAsync: upload } = useStorageUpload();

  console.log(AllCmps);

  useEffect(() => {
    let GetAdd = async () => {
      setAdd(await State?.Metamask?.getAddress());
    };
    State?.Contract && GetAdd();
  }, [State?.Contract]);

  let Submit = () => {
    try {
      if (Name && Target && File && Desc) {
        let Upload = async () => {
          const dataToUpload = [File];
          const uris = await upload({ data: dataToUpload });
          return uris;
        };
        Upload().then(async (res) => {
          try {
            const data = await CreateCompaign({
              args: [Name, Desc, res[0], Target],
            }).then(() => {
              alert("Compaign Created Successfully");
              setMenu("Your");
            });
          } catch (err) {
            alert(err?.message);
          }
        });
      } else {
        alert("Please Fill All Fields");
      }
    } catch (err) {
      alert(err?.message);
    }
  };
  return (
    <div className="bg-[#34495e] text-white p-2 rounded-sm shadow-md backdrop-filter backdrop-blur-xl bg-opacity-60 border-[1px] border-gray-500 h-[100%]">
      <section className="border-b-2 border-white sm:flex sm:flex-row sm:justify-between sm:items-center p-2 flex flex-col gap-y-5 sm:gap-y-0 w-[100%]">
        <header>
          <span
            onClick={() => {
              setMenu("Create");
            }}
            className="bg-green-500 rounded-sm p-2 cursor-pointer"
          >
            Create Compaign
          </span>
        </header>
        <header className="flex gap-x-2">
          <span
            onClick={() => setMenu("All")}
            className="bg-orange-500 rounded-sm p-2 cursor-pointer"
          >
            All Compaigns
          </span>
          <span
            onClick={() => setMenu("Your")}
            className="bg-yellow-500 rounded-sm p-2 cursor-pointer"
          >
            Your Compaigns
          </span>
        </header>
        <header className="flex gap-x-2 ">
          <Link
            to="/signup"
            className="bg-pink-500 rounded-sm p-2 cursor-pointer"
          >
            SignUp
          </Link>
          <Link
            to="/account"
            className="bg-blue-500 rounded-sm p-2 cursor-pointer"
          >
            Account
          </Link>
        </header>
      </section>

      <section className="p-2 flex justify-center items-center w-[100%] overflow-y-scroll">
        {Menu === "Your" && (
          <div className="w-[100%] sm:flex flex sm:flex-row flex-col gap-2">
            {Data?.data
              ? Data?.data?.map((Each, Ind) => {
                  return (
                    <Link
                      to={`/project/${Ind}`}
                      key={Ind}
                      className="p-2 flex flex-col gap-2 border-[1px] border-blue-500 w-[100%] sm:w-[20%] flex-wrap"
                    >
                      <MediaRenderer
                        src={Each[2]}
                        className="object-contain rounded-md w-[20%] bg-black"
                        height={100}
                      />
                      <p>{Each[0]}</p>
                      <p className="text-sm">{Each[1]}</p>
                    </Link>
                  );
                })
              : "Empty"}
          </div>
        )}

        {Menu === "All" && (
          <div className="w-[100%] sm:flex flex flex-col sm:flex-row gap-2">
            {AllCmps?.data
              ? AllCmps?.data?.map((Each, Ind) => {
                  return (
                    <Link
                      to={`/project/${Ind}`}
                      key={Ind}
                      className="p-2 flex flex-col gap-2 border-[1px] border-blue-500 w-[100%] sm:w-[20%] flex-wrap relative"
                    >
                      <MediaRenderer
                        src={Each[2]}
                        className="object-contain rounded-md w-[20%] bg-black"
                        height={100}
                      />
                      <p
                        className={`absolute p-2 w-2 h-2 ${
                          Each[6] == false ? "bg-red-500" : "bg-green-500"
                        } rounded-full m-1 right-2`}
                      ></p>
                      <p>{Each[0]}</p>
                      <p className="text-sm">{Each[1]}</p>
                    </Link>
                  );
                })
              : "Empty"}
          </div>
        )}

        {Menu === "Create" && (
          <div className="cursor-pointer w-[50%] p-2 flex justify-center items-center rounded-lg flex-col gap-5">
            <div className="sm:flex gap-5 w-[100%] sm:justify-center sm:items-center flex flex-col sm:flex-row">
              <section className="flex flex-col gap-5">
                {File && (
                  <img
                    src={FileURL}
                    alt=""
                    height={100}
                    width={100}
                    className="rounded-md border-2 border-white border-dashed h-[200px] w-[100%] object-contain p-1"
                  />
                )}
                <input
                  type="file"
                  className="input-field"
                  hidden
                  onChange={({ target: { files } }) => {
                    files[0] && setFile(files[0]);
                    if (files) {
                      setFileURL(URL.createObjectURL(files[0]));
                    }
                  }}
                />
                <small
                  className="p-2 bg-red-500 rounded-md w-[100%] text-center"
                  onClick={() => document.querySelector(".input-field").click()}
                >
                  Select File
                </small>
              </section>

              <section className="flex flex-col gap-5">
                <input
                  type="text"
                  value={Name}
                  onChange={(E) => {
                    SetName(E.target.value);
                  }}
                  className="outline-none p-3 rounded-md bg-gray-500"
                  placeholder="Project Name"
                />
                <input
                  type="text"
                  value={Desc}
                  onChange={(E) => {
                    SetDesc(E.target.value);
                  }}
                  className="outline-none p-3 rounded-md bg-gray-500"
                  placeholder="Project Story"
                />
                <input
                  type="number"
                  value={Target}
                  onChange={(E) => {
                    SetTarget(E.target.value);
                  }}
                  className="outline-none p-3 rounded-md bg-gray-500"
                  placeholder="Target Amount"
                />
                {isLoading ? (
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
                    onClick={Submit}
                  >
                    Submit
                  </button>
                )}
              </section>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Body;
