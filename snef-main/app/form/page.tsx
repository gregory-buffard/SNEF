"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import WorkersList, { SNEFWorker } from "@/app/form/WorkersList";
import Nav from "@/app/form/Nav";
import { PiWarningBold } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import Menu from "@/app/form/Menu";
import { CgClose } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowUp, IoMdAddCircle } from "react-icons/io";
import { LuClipboardEdit } from "react-icons/lu";
import {useUser} from '@clerk/nextjs';
import mergeSchedules from "./mergeSchedules";
import {AiOutlineLoading} from "react-icons/ai";

// - Dating -
let weekAgoDate: any = new Date();
weekAgoDate.setDate(weekAgoDate.getDate() - 7);

weekAgoDate = `${weekAgoDate.getDate()} / ${
  weekAgoDate.getMonth() + 1
} / ${weekAgoDate.getFullYear()}` as string;
const currentDate: string = `${new Date().getDate()} / ${
  new Date().getMonth() + 1
} / ${new Date().getFullYear()}`;

type Date = {
  current: string;
  weekAgo: string;
};
const date: Date = {
  current: currentDate,
  weekAgo: weekAgoDate,
};

export interface Data {
  name: string;
  codeNumber: string;
  days: number[];
}

// - Data Treatment -
type visibleWorkspace = {
  [key: string]: boolean;
};

const Page = () => {
  // - Values declaration -
  const [loading, setLoading] = useState<boolean>(true),
      {user} = useUser(),
    [data, setData] = useState<{ name: string; schedule: Data[] }>({
      name: "",
      schedule: [],
    }),
    isAdmin = user?.publicMetadata.admin || false as boolean,
    [menu, setMenu] = useState(false),
    [groupWorkers, setGroupWorkers] = useState<any[]>([]),
    [isInterim, setInterim] = useState<boolean>(false),
    [alertBox, setAlertBox] = useState<boolean>(false),
    [confirmationBox, setConfirmationBox] = useState<boolean>(false),
    [eSignature, setESignature] = useState<boolean>(false),
    [visibleWorkspace, setWorkspace] = useState(() => {
      const initVisibility: visibleWorkspace = {};
      data.schedule.forEach((workspace) => {
        initVisibility[workspace.name] = true;
      });
      return initVisibility;
    }),
    [newWorkspaceName, setWorkspaceName] = useState<string>(""),
    [newWorkspaceCode, setWorkspaceCode] = useState<string>(""),
    [addWorkspaceDialog, setWorkspaceDialog] = useState<boolean>(false),
    [selWorkerDialog, setSelWorkerDialog] = useState<boolean>(false),
    [selGroupWorker, setGroupWorker] = useState<string>(""),
    [workerType, setType] = useState<string>("");

  // - Initial Data Fetching -
  useEffect(() => {
    const name: string = Cookies.get("name") as string;
    switch (name.toLowerCase()) {
      case "undefined" || "null":
        window.location.href = "/";
        break;
      case "interim":
        setType("intérimaire");
        console.log(workerType);
        axios
          .get("https://api.snef.cloud/workers/?interim=true")
          .then((res) => {
            setGroupWorkers(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setLoading(false);
        break;
      case "snef":
        setType("employé");
        console.log(workerType);
        axios
          .get("https://api.snef.cloud/workers/?interim=false")
          .then((res) => {
            setGroupWorkers(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setLoading(false);
        break;
      default:
        axios
          .get(`https://api.snef.cloud/worker/?name=${name}`)
          .then((userRes) => {
            setInterim(userRes.data.interim);

            axios
              .get("https://api.snef.cloud/getWorkspaces")
              .then((dbRes) => {
                const mergedSchedules = mergeSchedules(
                  dbRes.data,
                  userRes.data.schedule || []
                );
                setData({
                  name: name,
                  schedule: mergedSchedules,
                });
                setGroupWorker(name);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
              });
          });
    }
  }, []);

  const fetchSchedule = (worker: string) => {
    console.log(worker);
    if (worker.length > 0) {
      console.log(worker);
      axios
        .get(`https://api.snef.cloud/worker/?name=${worker}`)
        .then((userRes) => {
          setInterim(userRes.data.interim);
          axios
            .get("https://api.snef.cloud/getWorkspaces")
            .then((dbRes) => {
              const mergedSchedules = mergeSchedules(
                dbRes.data,
                userRes.data.schedule || []
              );
              setData({
                name: worker,
                schedule: mergedSchedules,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else console.log("No worker selected");
  };

  // - Handling Workspaces List Updates -
  useEffect(() => {
    const updatedVisibility: visibleWorkspace = {};
    data.schedule.forEach((workspace) => {
      updatedVisibility[workspace.name] =
        visibleWorkspace[workspace.name] ?? true;
    });
    setWorkspace(updatedVisibility);
  }, [data.schedule, visibleWorkspace]);

  const handleNewWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    const newWorkspace: Data = {
      name: newWorkspaceName,
      codeNumber: newWorkspaceCode,
      days: [0, 0, 0, 0, 0, 0, 0],
    };

    try {
      const res = await axios.post(
        "https://api.snef.cloud/addWorkspace",
        newWorkspace
      );
      setData({
        ...data,
        schedule: [...data.schedule, newWorkspace],
      });
    } catch (err) {
      console.log(err);
    }
    setWorkspaceName("");
    setWorkspaceCode("");
  };

  return (
    <main className="w-1/2 iP:w-11/12 h-[90vh] m-auto flex flex-col justify-center items-center not-italic space-y-[3vh] select-none">
      {loading ? (
        <div className={"w-screen h-screen flex flex-col justify-center items-center space-y-[2vh]"}>
          <h1 className={'text-[1.5vw] iP:text-[2vh]'}>Chargement...</h1>
          <AiOutlineLoading className={'text-[2vw] iP:text-[2vh] text-snef animate-spin'} />
        </div>
      ) : (
        <>
          <Nav
            menu={menu}
            adminState={isAdmin}
            setMenu={setMenu}
            addWorkspaceDialog={addWorkspaceDialog}
            setAddWorkspaceDialog={setWorkspaceDialog}
            selectUserDialog={selWorkerDialog}
            setSelectUserDialog={setSelWorkerDialog}
            groupWorkers={groupWorkers}
            selGroupWorker={selGroupWorker}
            selWorkerDialog={selWorkerDialog}
          />

          <div
            className={`absolute top-0 bg-white-low text-red-600 border-neutral-100 border-[0.25vh] flex justify-center items-center space-x-[0.5vw] text-[2vh] px-[1vw] py-[0.5vh] rounded-[0.75vw] iP:rounded-[1vh] transition duration-800 ease-in-out iP:text-[1.25vh] z-10 backdrop-blur-md drop-shadow-2xl ${
              alertBox
                ? "translate-y-[2vw]"
                : "-translate-y-[10vw] iP:-translate-y-[10vh]"
            }`}
          >
            <PiWarningBold
              className={"text-[1.25vw] iP:text-[1.75vh] drop-shadow-redish"}
            />
            <p className={"drop-shadow-redish"}>
              Veuillez cocher la case de signature pour soumettre les données.
            </p>
          </div>

          <div
            className={`absolute top-0 bg-white-low text-green-600 border-neutral-100 border-[0.25vh] flex justify-center items-center space-x-[0.5vw] text-[2vh] px-[1vw] py-[0.5vh] rounded-[0.75vw] iP:rounded-[1vh] transition duration-800 ease-in-out iP:text-[1.25vh] z-10 backdrop-blur-md drop-shadow-2xl ${
              confirmationBox
                ? "translate-y-[2vw]"
                : "-translate-y-[10vw] iP:-translate-y-[10vh]"
            }`}
          >
            <TiTick
              className={`text-[1.5vw] iP:text-[1.75vh] drop-shadow-greenish opacity-0 ${
                confirmationBox ? "animateTick" : ""
              }`}
            />
            <p className={"drop-shadow-greenish"}>
              Les donneés ont été soumisent.
            </p>
          </div>

          <Menu
            menu={menu}
            setMenu={setMenu}
            data={data.schedule}
            workspaceVisibility={visibleWorkspace}
            setWorkspaceVisibility={setWorkspace}
          />

          <div
            className={`z-10 absolute scrollbarStyle bg-neutral-100 iP:bg-snef iP:backdrop-blur-xl px-[1vw] py-[1vh] rounded-b-[0.75vw] iP:drop-shadow-none transition duration-200 ease-in-out flex flex-col justify-start items-center iP:w-[90vw] iP:h-screen iP:z-10 iP:rounded-r-[2vh] iP:justify-center iP:items-baseline iP:space-y-[2vh] iP:pl-[25%] iP:text-[2vh] iP:text-neutral-100 iP:border-y-[0.25vh] iP:border-r-[0.25vh] iP:border-teal-700 iP:border-opacity-25 overflow-y-scroll left-[2vw] drop-shadow-2xl top-[-3vh] iP:left-[-3vh] space-y-[2vh] ${
              addWorkspaceDialog
                ? "translate-y-[0] iP:translate-x-0"
                : "translate-y-[-100vh] iP:translate-y-0 iP:translate-x-[-100vw]"
            }`}
          >
            <button
              type={"button"}
              onClick={() => {
                setWorkspaceDialog(!addWorkspaceDialog);
              }}
              className={
                "hidden iP:block absolute right-[3vw] top-[3vw] text-[3vh] px-[1vw] py-[1vw] text-center hover:text-neutral-300 hover:bg-neutral-900 hover:bg-opacity-50 rounded-full transition-all duration-200 ease-in-out"
              }
            >
              <CgClose />
            </button>

            <div>
              <p>Nom du chantier</p>
              <input
                type={"text"}
                value={newWorkspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className={
                  "iP:text-neutral-800 border-[.1vw] iP:border-[.25vh] border-neutral-300 outline-none rounded-[.25vw] iP:rounded-[1vh] px-[.25vw] iP:px-[.5vh] py-[.25vh] bg-neutral-50 hover:bg-neutral-300 focus:bg-neutral-300 transition-colors duration-200 ease-in-out shadow-inner"
                }
              />
            </div>

            <div>
              <p>Code du chantier</p>
              <input
                type={"text"}
                value={newWorkspaceCode}
                onChange={(e) => setWorkspaceCode(e.target.value)}
                className={
                  "iP:text-neutral-800 border-[.1vw] iP:border-[.25vh] border-neutral-300 outline-none rounded-[.25vw] iP:rounded-[1vh] px-[.25vw] iP:px-[.5vh] py-[.25vh] bg-neutral-50 hover:bg-neutral-300 focus:bg-neutral-300 transition-colors duration-200 ease-in-out shadow-inner"
                }
              />
            </div>

            <button
              type={"button"}
              onClick={handleNewWorkspace}
              className={
                "iP:text-neutral-800 flex justify-start items-center space-x-[.25vw] iP:space-x-[.5vh] bg-neutral-300 px-[.5vw] iP:px-[1vh] py-[.5vh] rounded-[.25vw] iP:rounded-[1vh] shadow-inner hover:bg-neutral-400 transition-colors duration-200 ease-in-out drop-shadow-md"
              }
            >
              <IoMdAddCircle />
              <p>Ajouter</p>
            </button>
          </div>
          {groupWorkers.length > 0 && (
            <div
              className={`z-10 absolute scrollbarStyle bg-neutral-100 iP:bg-snef iP:backdrop-blur-xl px-[1vw] py-[1vh] rounded-b-[0.75vw] iP:drop-shadow-none transition duration-200 ease-in-out flex flex-col justify-start items-center iP:w-[90vw] iP:h-screen iP:z-10 iP:rounded-r-[2vh] iP:justify-center iP:items-baseline iP:space-y-[2vh] iP:pl-[25%] iP:text-[2vh] iP:text-neutral-100 iP:border-y-[0.25vh] iP:border-r-[0.25vh] iP:border-teal-700 iP:border-opacity-25 overflow-y-scroll left-[2vw] drop-shadow-2xl top-[-3vh] iP:left-[-3vh] ${
                selWorkerDialog
                  ? "translate-y-[0] iP:translate-x-0"
                  : "translate-y-[-100vh] iP:translate-y-0 iP:translate-x-[-100vw]"
              }`}
            >
              <button
                type={"button"}
                onClick={() => setSelWorkerDialog(!selWorkerDialog)}
                className={
                  "hidden iP:block absolute right-[3vw] top-[3vw] text-[3vh] px-[1vw] py-[1vw] text-center hover:text-neutral-300 hover:bg-neutral-900 hover:bg-opacity-50 rounded-full transition-all duration-200 ease-in-out"
                }
              >
                <CgClose />
              </button>
              <WorkersList
                workers={groupWorkers}
                setGroupWorker={setGroupWorker}
                setData={setData}
                setInterim={setInterim}
              />
            </div>
          )}
          {selGroupWorker && (
            <>
              <div
                className={
                  "flex flex-col justify-center items-center space-y-2"
                }
              >
                <h1 className={"text-[1.5vw] iP:text-[2vh] text-neutral-800 iP:mt-[5vh] mt-[5vw]"}>
                  Formulaire de pointage de {selGroupWorker}
                </h1>
                <h3
                  className={
                    "border-2 border-neutral-300 px-[0.25vw] py-[0.25vh] rounded-[0.5vw] text-[0.6vw] iP:text-[1.5vh] iP:rounded-[1vh] iP:px-[1vw]"
                  }
                >
                  {date.weekAgo} – {date.current}
                </h3>
              </div>

              <div
                className={
                  "flex text-[0.6vw] space-x-[1vw] iP:space-x-[5vh] bg-neutral-100 rounded-[1vw] iP:rounded-[1vh] px-[2vw] iP:px-[4vw] py-[2vh] iP:py-[3vh] drop-shadow-2xl iP:w-[90vw] iP:overflow-auto iP:text-[1.5vh] iP:whitespace-nowrap scrollbarStyle"
                }
              >
                <WeekCol />
                {data.schedule.map((item, index) => {
                  const setHours = (day: Data) => {
                    let newData = [...data.schedule];
                    newData[index] = day;
                    data.schedule = newData;
                  };
                  return (
                    <Line
                      key={index}
                      data={item}
                      setData={setHours}
                      workspaceVisibility={visibleWorkspace}
                      setWorkspaceVisibility={setWorkspace}
                    />
                  );
                })}
              </div>
            </>
          )}

          {selGroupWorker ? (
            <div
              className={
                "w-full flex px-[2vw] justify-between items-center text-[0.6vw] iP:text-[1.5vh]"
              }
            >
              <div
                className={
                  "flex flex-col justify-start items-start space-y-[1vh]"
                }
              >
                <div
                  className={
                    "flex justify-center items-center space-x-[1vw] iP:space-x-[2vh] iP:w-[60vw]"
                  }
                >
                  <input
                    type={"checkbox"}
                    checked={eSignature}
                    className={"cursor-pointer iP:w-[3vh] iP:h-[3vh] accent-snef"}
                    onClick={() => {
                      setESignature(!eSignature);
                    }}
                  />
                  <p>
                    Je confirme lexactitude des données ci-dessus et les signe
                    en cochant cette case.
                  </p>
                </div>
                <div
                  className={
                    "flex justify-center items-center space-x-[1vw] iP:space-x-[2vh] iP:w-[60vw] accent-snef"
                  }
                >
                  <p>Intérimaire ?</p>
                  <div
                    className={"flex justify-start items-center space-x-[1vw] iP:space-x-[2vh]"}
                  >
                    <div
                      className={
                        "flex justify-center items-center space-x-[0.5vw]"
                      }
                    >
                      <p>Oui</p>
                      <input
                        type={"radio"}
                        checked={isInterim}
                        value={"true"}
                        className={"cursor-pointer iP:w-[2vh] iP:h-[2vh]"}
                        onChange={() => setInterim(true)}
                      />
                    </div>
                    <div
                      className={
                        "flex justify-center items-center space-x-[0.5vw]"
                      }
                    >
                      <p>Non</p>
                      <input
                        type={"radio"}
                        checked={!isInterim}
                        value={"false"}
                        className={"cursor-pointer iP:w-[2vh] iP:h-[2vh]"}
                        onChange={() => setInterim(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type={"button"}
                onClick={async () => {
                  if (!eSignature) {
                    setAlertBox(true);
                    setTimeout(() => {
                      setAlertBox(false);
                    }, 4600);
                  } else {
                    console.log(data);
                    if (selGroupWorker !== null) {
                      try {
                        const response = await axios
                          .post("https://api.snef.cloud/schedule", {
                            name: data.name,
                            schedule: data.schedule,
                            interim: isInterim,
                          })
                          .then(() => {
                            setConfirmationBox(true);
                            setTimeout(() => {
                              setConfirmationBox(false);
                            }, 4600);
                          });

                        if (Cookies.get("name")) {
                          const name = Cookies.get("name") as string;
                          switch (name.toLowerCase()) {
                            case "snef":
                              if (isInterim) {
                                const updatedWorkers = groupWorkers.filter(
                                  (worker: SNEFWorker) =>
                                    worker.name !== data.name
                                ) as any;
                                setGroupWorkers(updatedWorkers);
                                setGroupWorker(updatedWorkers[0].name);
                                fetchSchedule(updatedWorkers[0].name);
                              }
                              break;
                            case "interim":
                              if (!isInterim) {
                                const updatedWorkers = groupWorkers.filter(
                                  (worker: SNEFWorker) =>
                                    worker.name !== data.name
                                ) as any;
                                setGroupWorkers(updatedWorkers);
                                setGroupWorker(updatedWorkers[0].name);
                                fetchSchedule(updatedWorkers[0].name);
                              }
                              break;
                            default:
                              window.location.replace("https://snef.cloud");
                              break;
                          }
                        }
                      } catch (err) {
                        console.log(err);
                      }
                    }
                  }
                }}
                className={
                  "flex justify-center items-center space-x-[1vw] bg-neutral-100 px-[1vw] iP:px-[2vw] py-[1vh] rounded-[0.5vw] iP:rounded-[1vh] hover:bg-[#005350] hover:bg-opacity-50 hover:text-neutral-100 transition duration-200 ease-in-out shadow-inner border-b-2 border-neutral-50"
                }
              >
                <p>Soumettre</p>
                <LuClipboardEdit />
              </button>
            </div>
          ) : (
            <div className={"flex flex-col justify-center items-center"}>
              <h1 className={"text-[1.5vw] iP:text-[2vh]"}>
                Veuillez choisir un {workerType} dans le menu.
              </h1>
            </div>
          )}
        </>
      )}
    </main>
  );
};
const WeekCol = () => {
  const days = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  return (
    <div className={"flex flex-col justify-around items-end pt-[4vh]"}>
      {days.map((item, index) => {
        return (
          <div key={index} className={`flex justify-center items-center`}>
            {item}
          </div>
        );
      })}
    </div>
  );
};

const Line = ({
  data,
  setData,
  workspaceVisibility,
  setWorkspaceVisibility,
}: {
  data: Data;
  setData: any;
  workspaceVisibility: { [key: string]: boolean };
  setWorkspaceVisibility: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
}) => {
  if (!workspaceVisibility[data.name]) {
    return null;
  } else {
    return (
      <div className={`flex flex-col items-center w-full text-center`}>
        <div
          className={`bg-neutral-50 rounded-[0.5vw] drop-shadow-lg w-[9vw] iP:w-[22vw] h-[4vh] flex justify-center items-center iP:rounded-[1.25vh]`}
        >
          {data.name}
        </div>

        {data.days.map((item: any, index: any) => {
          const setHours = (hours: number) => {
            let newDays = [...data.days];
            newDays[index] = hours;
            let newData = {
              name: data.name,
              codeNumber: data.codeNumber,
              days: newDays,
            };
            setData(newData);
          };
          return <Section key={index} item={item} setData={setHours} />;
        })}
      </div>
    );
  }
};

const Section = ({ item, setData }: { item: number; setData: any }) => {
  return (
    <div className={"flex my-[1vh]"}>
      <div className={"flex justify-center items-center"}>
        <p
          className={
            "px-[1vw] iP:px-[2vw] py-[1vh] iP:py-[0.5vh] bg-neutral-50 shadow-inner rounded-l-[0.5vw] iP:rounded-l-[1vh]"
          }
        >
          {item}h
        </p>
        <div
          className={"flex flex-col justify-center items-center drop-shadow-lg"}
        >
          <button
            type={"button"}
            className={
              "bg-neutral-50 rounded-t-[0.5vw] iP:rounded-t-[1vh] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"
            }
            onClick={() => setData(item + 1)}
          >
            <IoIosArrowUp
              className={"text-[1vw] iP:text-[3vh] mx-[0.5vw] h-[2.5vh]"}
            />
          </button>
          <button
            type={"button"}
            className={
              "bg-neutral-50 rounded-b-[0.5vw] iP:rounded-b-[1vh] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"
            }
            onClick={() => {
              if (item > 0) setData(item - 1);
            }}
          >
            <IoIosArrowDown
              className={"text-[1vw] iP:text-[3vh] mx-[0.5vw] h-[2.5vh]"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
