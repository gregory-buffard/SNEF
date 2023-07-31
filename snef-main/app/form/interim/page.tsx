"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown, IoMdAddCircle } from "react-icons/io";
import { LuClipboardEdit } from "react-icons/lu";
import Cookies from "js-cookie";
import axios from "axios";
import Menu from "../Menu";
import { PiWarningBold } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import WorkersList, { SNEFWorker } from "../WorkersList";
import { TiTick } from "react-icons/ti";
import { BsArrowUpShort } from "react-icons/bs";
import Nav from "../Nav";

export interface Data {
  name: string;
  codeNumber: string;
  days: number[];
}

const Page = () => {
  const [selectedInterimWorker, setSelectedInterimWorker] =
    useState<SNEFWorker | null>(null);
  const [selectedWorkerSchedule, setSelectedWorkerSchedule] = useState<any[]>(
    []
  );
  const [data, setData] = useState<{ name: string; schedule: Data[] }>({
    name: "",
    schedule: [],
  });

  const [loading, setLoading] = useState(true);
  const [allWorkspaces, setAllWorkspaces] = useState([]);
  const currentDate: string =
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear();
  const dateAWeekAgo = new Date();
  dateAWeekAgo.setDate(dateAWeekAgo.getDate() - 7);
  const weekAgo: string =
    dateAWeekAgo.getDate() +
    "/" +
    (dateAWeekAgo.getMonth() + 1) +
    "/" +
    dateAWeekAgo.getFullYear();

  const [menu, setMenu] = useState(false);

  function mergeSchedules(initSchedule: any, userSchedule: any) {
    console.log(initSchedule, userSchedule);
    const userScheduleMap = new Map(
      userSchedule.map((item: any) => [item.name, item])
    );

    // If workspace already exists in user schedule, use that, otherwise use initial workspace
    return initSchedule.map(
      (workspace: any) => userScheduleMap.get(workspace.name) || workspace
    );
  }

  const [interimWorkers, setInterimWorkers] = useState([]);

  useEffect(() => {
    const name = Cookies.get("name");
    if (name == undefined) {
      window.location.href = "/";
      return;
    } else if (name.toLowerCase() == "interim") {
      axios
        .get("https://api.snef.cloud/workers/?interim=true")
        .then((res) => {
          setInterimWorkers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    axios
      .get(`https://api.snef.cloud/worker/?name=${name}`)
      .then((res) => {
        console.log(res.data);
        setInterim(res.data.interim || false);
        axios.get("https://api.snef.cloud/getWorkspaces").then((response) => {
          const mergedSchedules = mergeSchedules(
            response.data,
            res.data.schedule || []
          );
          setData({
            name: name,
            schedule: mergedSchedules,
          });
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selectedInterimWorker !== null && selectedInterimWorker !== undefined) {
      setInterim(selectedInterimWorker.interim);
      axios
        .get(
          `https://api.snef.cloud/worker/?name=${selectedInterimWorker.name}`
        )
        .then((res) => {
          let workerData = res.data;
          axios.get("https://api.snef.cloud/getWorkspaces").then((response) => {
            const allWorkspaces = response.data;
            allWorkspaces.forEach((workspace: any) => {
              if (
                !workerData.schedule.find(
                  (scheduleItem: any) => scheduleItem.name === workspace.name
                )
              ) {
                workerData.schedule.push(workspace);
              }
            });
          });
          setData(workerData);
          setSelectedWorkerSchedule(workerData.schedule);
          setSignature(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedInterimWorker]);

  const [alertBox, setAlertBox] = useState(false);
  const [signature, setSignature] = useState(false);

  interface WorkspaceVisibility {
    [key: string]: boolean;
  }

  const [workspaceVisibility, setWorkspaceVisibility] = useState(
    allWorkspaces.reduce(
      (visibilities: { [key: string]: boolean }, workspace: any) => {
        visibilities[workspace._id] = true;
        return visibilities;
      },
      {}
    )
  );

  useEffect(() => {
    const newVisibility: WorkspaceVisibility = {};
    data.schedule.forEach((workspace) => {
      newVisibility[workspace.name] =
        workspaceVisibility[workspace.name] ?? true;
    });
    setWorkspaceVisibility(newVisibility);
  }, [data.schedule]);

  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newWorkspaceCode, setNewWorkspaceCode] = useState("");

  async function handleNewWorkspaceSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newWorkspace: Data = {
      name: newWorkspaceName,
      codeNumber: newWorkspaceCode,
      days: [0, 0, 0, 0, 0, 0, 0],
    };

    try {
      const response = await axios.post(
        "https://api.snef.cloud/addWorkspace",
        newWorkspace
      );
      console.log(response.data);

      setData({
        ...data,
        schedule: [...data.schedule, newWorkspace],
      });
    } catch (error) {
      console.error(error);
    }

    setNewWorkspaceName("");
    setNewWorkspaceCode("");
  }

  const [addWorkspaceDialog, setAddWorkspaceDialog] = useState(false);
  const [isInterim, setInterim] = useState(false);
  const [selectUserDialog, setSelectUserDialog] = useState(false);
  const [workers, setWorkers] = useState<SNEFWorker[]>([]);
  const [confirmationBox, setConfirmationBox] = useState(false);
  const [isAdmin, setAdmin] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.snef.cloud/getWorkspaces")
      .then((res) => {
        setAllWorkspaces(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="w-1/2 iP:w-11/12 h-[95vh] m-auto flex flex-col justify-center items-center not-italic space-y-[3vh] select-none">
      {loading ? (
        <div className={"w-screen h-screen flex justify-center items-center"}>
          <p>Chargement...</p>
        </div>
      ) : (
        <>
          <Nav
            menu={menu}
            adminState={isAdmin}
            setMenu={setMenu}
            addWorkspaceDialog={addWorkspaceDialog}
            setAddWorkspaceDialog={setAddWorkspaceDialog}
            selectUserDialog={selectUserDialog}
            setSelectUserDialog={setSelectUserDialog}
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
            workspaceVisibility={workspaceVisibility}
            setWorkspaceVisibility={setWorkspaceVisibility}
          />

          <div
            className={`absolute bg-neutral-100 iP:bg-snef iP:backdrop-blur-xl px-[1vw] py-[1vh] rounded-[0.5vw] drop-shadow-lg iP:drop-shadow-none top-[3vh] iP:top-[-3vh] transition duration-200 ease-in-out left-0 flex flex-col justify-start items-start iP:w-[90vw] iP:h-screen iP:z-10 iP:rounded-r-[2vh] iP:justify-center iP:items-baseline iP:space-y-[2vh] iP:pl-[25%] iP:text-[2vh] iP:text-neutral-100 iP:border-y-[0.25vh] iP:border-r-[0.25vh] iP:border-teal-700 iP:border-opacity-25 space-y-[1vh] ${
              addWorkspaceDialog
                ? "translate-x-[2vw]  iP:translate-x-0"
                : "translate-x-[-15vw] iP:translate-x-[-100vw]"
            }`}
          >
            <button
              type={"button"}
              onClick={() => {
                setAddWorkspaceDialog(!addWorkspaceDialog);
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
                onChange={(e) => setNewWorkspaceName(e.target.value)}
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
                onChange={(e) => setNewWorkspaceCode(e.target.value)}
                className={
                  "iP:text-neutral-800 border-[.1vw] iP:border-[.25vh] border-neutral-300 outline-none rounded-[.25vw] iP:rounded-[1vh] px-[.25vw] iP:px-[.5vh] py-[.25vh] bg-neutral-50 hover:bg-neutral-300 focus:bg-neutral-300 transition-colors duration-200 ease-in-out shadow-inner"
                }
              />
            </div>

            <button
              type={"button"}
              onClick={handleNewWorkspaceSubmit}
              className={
                "iP:text-neutral-800 flex justify-start items-center space-x-[.25vw] iP:space-x-[.5vh] bg-neutral-300 px-[.5vw] iP:px-[1vh] py-[.5vh] rounded-[.25vw] iP:rounded-[1vh] shadow-inner hover:bg-neutral-400 transition-colors duration-200 ease-in-out drop-shadow-md"
              }
            >
              <IoMdAddCircle />
              <p>Ajouter</p>
            </button>
          </div>
          {interimWorkers.length > 0 && (
            <div
              className={`absolute bg-neutral-100 iP:bg-snef iP:backdrop-blur-xl px-[1vw] py-[1vh] rounded-[0.5vw] drop-shadow-lg iP:drop-shadow-none top-[3vh] iP:top-[-3vh] transition duration-200 ease-in-out left-0 flex flex-col justify-start items-start iP:w-[90vw] iP:h-screen iP:z-10 iP:rounded-r-[2vh] iP:justify-center iP:items-baseline iP:space-y-[2vh] iP:pl-[25%] iP:text-[2vh] iP:text-neutral-100 iP:border-y-[0.25vh] iP:border-r-[0.25vh] iP:border-teal-700 iP:border-opacity-25 space-y-[1vh] ${
                selectUserDialog
                  ? "translate-x-[2vw]  iP:translate-x-0"
                  : "translate-x-[-15vw] iP:translate-x-[-100vw]"
              }`}
            >
              <button
                type={"button"}
                onClick={() => setSelectUserDialog(!selectUserDialog)}
                className={
                  "hidden iP:block absolute right-[3vw] top-[3vw] text-[3vh] px-[1vw] py-[1vw] text-center hover:text-neutral-300 hover:bg-neutral-900 hover:bg-opacity-50 rounded-full transition-all duration-200 ease-in-out"
                }
              >
                <CgClose />
              </button>
              <WorkersList
                workers={interimWorkers}
                setSelectedWorker={setSelectedInterimWorker}
              />
            </div>
          )}
          {selectedInterimWorker && (
            <>
              <div
                className={
                  "flex flex-col justify-center items-center space-y-2"
                }
              >
                <h1 className={"text-[1.5vw] iP:text-[2vh] text-neutral-800"}>
                  Formulaire de pointage de {selectedInterimWorker.name}
                </h1>
                <h3
                  className={
                    "border-2 border-neutral-300 px-[0.25vw] py-[0.25vh] rounded-[0.5vw] text-[0.6vw] iP:text-[1.5vh] iP:rounded-[1vh] iP:px-[1vw]"
                  }
                >
                  {weekAgo} – {currentDate}
                </h3>
              </div>

              <div
                className={
                  "flex text-[0.6vw] space-x-[1vw] iP:space-x-[5vh] bg-neutral-100 rounded-[1vw] iP:rounded-[1vh] px-[2vw] iP:px-[4vw] py-[2vh] iP:py-[3vh] drop-shadow-2xl iP:w-[90vw] iP:overflow-auto iP:text-[1.5vh] iP:whitespace-nowrap scrollbarStyle"
                }
              >
                <WeekCol />
                {selectedWorkerSchedule.map((item, index) => {
                  const setHours = (day: Data) => {
                    let newData = [...selectedWorkerSchedule];
                    newData[index] = day;
                    setSelectedWorkerSchedule(newData);
                  };
                  return (
                    <Line
                      key={index}
                      data={item}
                      setData={setHours}
                      workspaceVisibility={workspaceVisibility}
                      setWorkspaceVisibility={setWorkspaceVisibility}
                    />
                  );
                })}
              </div>
            </>
          )}

          {selectedInterimWorker ? (
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
                    checked={signature}
                    className={"cursor-pointer"}
                    onClick={() => {
                      setSignature(!signature);
                    }}
                  />
                  <p>
                    Je confirme lexactitude des données ci-dessus et les signe
                    en cochant cette case.
                  </p>
                </div>
                <div
                  className={
                    "flex justify-center items-center space-x-[1vw] iP:space-x-[2vh] iP:w-[60vw]"
                  }
                >
                  <p>Intérimaire ?</p>
                  <div
                    className={"flex justify-center items-center space-x-[1vw]"}
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
                        className={"cursor-pointer"}
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
                        className={"cursor-pointer"}
                        onChange={() => setInterim(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type={"button"}
                onClick={async () => {
                  if (!signature) {
                    setAlertBox(true);
                    setTimeout(() => {
                      setAlertBox(false);
                    }, 4600);
                  } else {
                    console.log(data);
                    if (selectedInterimWorker !== null) {
                      try {
                        const response = await axios
                          .post("https://api.snef.cloud/schedule", {
                            name: selectedInterimWorker.name,
                            schedule: selectedWorkerSchedule,
                            interim: isInterim,
                          })
                          .then(() => {
                            setConfirmationBox(true);
                            setTimeout(() => {
                              setConfirmationBox(false);
                            }, 4600);
                          });

                        if (!isInterim) {
                          const updatedWorkers = workers.filter(
                            (worker: SNEFWorker) =>
                              worker._id !== selectedInterimWorker._id
                          );
                          setWorkers(updatedWorkers);
                          setSelectedInterimWorker(updatedWorkers[0]);
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
              <BsArrowUpShort
                className={`absolute text-[4vw] text-snef right-[46.8vw] iP:left-[17vh] top-[6vw] iP:top-[9vh] iP:text-[8vh] animate-bounce transition-opacity duration-200 ease-in-out -z-20 ${
                  selectUserDialog ? "opacity-0" : "opacity-100"
                }`}
              />
              <h1 className={"text-[1.5vw] iP:text-[2vh]"}>
                Veuillez choisir un intérimaire dans le menu.
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

        {data.days.map((item, index) => {
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
