"use client";

import axios from "axios";
import React, { useState } from "react";
import { useToQuery } from "./useToQuery";
import Link from "next/link";

const Page = () => {
  const [name, setName] = useState("");
  const { toQuery, setToQuery } = useToQuery();
  /*const [name, setName] = useState<string>("");
  const [data, setData] = useState<IFile>({ name: "" });

  const handleReq = async (e:any) => {
    e.preventDefault();
    const result = await axios.get("/api/route", { params: { name } });
    axios.post("/api/route", { name }).then((r) => console.log(r.data));
    console.log(result);
  };*/

  return (
    /*<div>
      <div>
        <h2>Get</h2>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <button onClick={handleReq}>Click me</button>
      </div>
      <div>
        <h2>Post</h2>
        FIX
        <input
          type="text"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          type="text"
          onChange={(e) => setData({ ...data, date: e.target.value })}
        />
        <input
          type="text"
          onChange={(e) =>
            setData({ ...data, workDone: [{ place: e.target.value }] })
          }
        />
        <input
          type="text"
          onChange={(e) =>
            setData({
              ...data,
              workDone: [{ timeInMin: Number(e.target.value) }],
            })
          }
        />
        <input
          type="text"
          onChange={(e) =>
            setData({ ...data, workDone: [{ description: e.target.value }] })
          }
        />
        <button
          onClick={() =>
            axios
              .post("http://localhost:5000/api/updateWorker", data)
              .then((e) => console.log(e.data))
          }
        >
          Click me
        </button>
      </div>
    </div>*/
    <main className="w-screen h-screen flex justify-center items-center flex-col space-y-[2vh]">
      <svg
        id="brand"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="w-[10vw] drop-shadow-2xl"
      >
        <rect
          id="Rectangle_1"
          data-name="Rectangle 1"
          width="200"
          height="200"
          rx="10"
          fill="#005350"
        />
        <path
          id="Path_1"
          data-name="Path 1"
          d="M123.4,77.1h19.8a25.612,25.612,0,0,0,3.9-.3v6.1a24.33,24.33,0,0,0-3.8-.3h-20v11h21.2a27.032,27.032,0,0,0,4.1-.5v6.7h-35a6.7,6.7,0,0,0,.7-3.1V63.9a8.756,8.756,0,0,0-.7-3.2H148l.5,6.8a13.2,13.2,0,0,0-3.9-.6H123.3V77.1Z"
          fill="#fff"
        />
        <path
          id="Path_2"
          data-name="Path 2"
          d="M167.3,77.1h17.6a13.945,13.945,0,0,0,4.1-.4v6.7a13.945,13.945,0,0,0-4.1-.4H167.2V96a23.181,23.181,0,0,0,.6,3.8H157.3A9.857,9.857,0,0,0,158,96V65a20.073,20.073,0,0,0-.5-4.2h32.7l.8,6.6a17.223,17.223,0,0,0-3.9-.4H167.2Z"
          fill="#fff"
        />
        <path
          id="Path_3"
          data-name="Path 3"
          d="M69.3,99.9H59.6c1-1,.9-4.2.9-4.2v-31a8.461,8.461,0,0,0-.9-4.1h9.7v5.6s3.9-6.3,17-6.2c7.8,0,15.8,2.8,17.1,9.5,0,0,1,.6.9,13.8V96s.5,3.8.9,4H95.1a10.879,10.879,0,0,0,.7-4V76s.2-3.7-1.6-5.8c-1.4-1.7-3-3.7-11.7-3.3,0,0-5.9-.1-9.3,2.4a9.495,9.495,0,0,0-3.9,8V99.9Z"
          fill="#fff"
        />
        <path
          id="Path_4"
          data-name="Path 4"
          d="M110.9,48.5h4.2v1.1h-4.3v2h3.8a1.7,1.7,0,0,0,.7-.1v1.2H109a1.268,1.268,0,0,0,.1-.6v-6c0-.2-.1-.4-.1-.6h6.4l.1,1.2a1.7,1.7,0,0,0-.7-.1H111v1.9Z"
          fill="#35b5b3"
        />
        <path
          id="Path_5"
          data-name="Path 5"
          d="M39.4,52l-2-2.3a2.149,2.149,0,0,0,1.9-2.1,1.638,1.638,0,0,0-1-1.5,6.184,6.184,0,0,0-2.7-.5H31.4a1.268,1.268,0,0,1,.1.6V52a.749.749,0,0,1-.1.5h2V49.7h2l2.3,2.8H40A1.024,1.024,0,0,1,39.4,52Zm-3.5-3.3H33.4v-2H36a2.153,2.153,0,0,1,1.1.2.871.871,0,0,1,.6.8s.2.7-.8.9C36.6,48.6,36.2,48.7,35.9,48.7Z"
          fill="#35b5b3"
        />
        <path
          id="Path_6"
          data-name="Path 6"
          d="M16.4,49.1v1.1s.1-.1,1.1-.1H20v.1c-.9,1.1-3.7,1-3.7,1-3.5,0-3-2.4-3-2.4.2-2,2.5-2.1,3.1-2.1a12.718,12.718,0,0,1,3.9.6V46a9.525,9.525,0,0,0-4.1-.6c-.8,0-4.4,0-4.7,3.4,0,0-.5,3.7,4.8,3.7a9.071,9.071,0,0,0,4.3-1V49H16.4Z"
          fill="#35b5b3"
        />
        <path
          id="Path_7"
          data-name="Path 7"
          d="M50.4,49c0-2,1.4-3.6,4.7-3.6S59.8,47,59.8,49s-1.4,3.6-4.7,3.6S50.4,51,50.4,49ZM55,51.4c2.3,0,2.7-1.1,2.7-2.4s-.4-2.4-2.7-2.4-2.7,1.1-2.7,2.4S52.9,51.4,55,51.4Z"
          fill="#35b5b3"
        />
        <path
          id="Path_8"
          data-name="Path 8"
          d="M98.3,47.5a1.638,1.638,0,0,0-1-1.5,6.184,6.184,0,0,0-2.7-.5H90.4a1.268,1.268,0,0,1,.1.6V52a1.268,1.268,0,0,1-.1.6h2V49.8h4A2.177,2.177,0,0,0,98.3,47.5Zm-2.3,1a3.4,3.4,0,0,1-1,.1H92.5v-2h2.6a2.153,2.153,0,0,1,1.1.2.858.858,0,0,1,.6.7C96.7,47.6,96.9,48.3,96,48.5Z"
          fill="#35b5b3"
        />
        <path
          id="Path_9"
          data-name="Path 9"
          d="M79.3,45.5H77.2v3.7s0,1.3-.6,1.7a3.287,3.287,0,0,1-1.7.4,3.371,3.371,0,0,1-1.7-.5c-.7-.4-.6-1.7-.6-1.7V45.5H70.5v.4h0v3.5a3.037,3.037,0,0,0,.8,2.1,4.426,4.426,0,0,0,3.5,1H75a4.971,4.971,0,0,0,3.5-1,2.878,2.878,0,0,0,.9-2.1V45.8C79.2,45.7,79.2,45.6,79.3,45.5Z"
          fill="#35b5b3"
        />
        <path
          id="Path_10"
          data-name="Path 10"
          d="M18.8,70.4s-.5-5.5,12.4-4.9c12.1.5,16.5,5.4,16.5,5.4v-8s-1.2-1.3-7.7-2.5c-3.1-.5-6.2-.8-9.3-1-10.7-.6-19.1,1.9-20.9,9v.4a9.634,9.634,0,0,0,5.3,11c4.7,2.5,8.4,2.4,15.3,3.3,6.9.8,10.4,1.4,10.3,5.5a5.338,5.338,0,0,1-.5,2.5v.1c-1,1.7-3.9,3.6-11.7,3.4C13,94.1,10.5,90.3,9.9,88V98.4a58.6,58.6,0,0,0,18.6,2.7S49.2,103,49.7,88.3v-.2a10.047,10.047,0,0,0-8-10.7A72.23,72.23,0,0,0,31.3,76C28.2,75.6,18.5,75.9,18.8,70.4Z"
          fill="#fff"
        />
      </svg>
      <form className="flex justify-center items-center space-x-[0.5vw]">
        <input
          placeholder="Prénom et nom d'employé"
          className="bg-neutral-300 rounded-full text-xl border-none outline-none px-[1vw] py-[0.5vh] font-normal text-neutral-600 drop-shadow-2xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="button"
          onClick={async () => {
            setToQuery(name);
            try {
                const result = await axios.post('/api/sendExcel.ts', name );
                console.log(result);
              // handle the response accordingly
            } catch (error) {
              // handle error
              console.error(error);
            }
          }}
        >
          <Link href="http://localhost:5001/download">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0,0,256,256"
              className="fill-neutral-600 w-[1.75vw]"
            >
              <g
                fill="#525252"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
              >
                <g transform="scale(8.53333,8.53333)">
                  <path d="M13,3c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c2.39651,0 4.59738,-0.85101 6.32227,-2.26367l5.9707,5.9707c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-5.9707,-5.9707c1.41266,-1.72488 2.26367,-3.92576 2.26367,-6.32227c0,-5.511 -4.489,-10 -10,-10zM13,5c4.43012,0 8,3.56988 8,8c0,4.43012 -3.56988,8 -8,8c-4.43012,0 -8,-3.56988 -8,-8c0,-4.43012 3.56988,-8 8,-8z"></path>
                </g>
              </g>
            </svg>
          </Link>
        </button>
      </form>
    </main>
  );
};

/*interface IFile {
  name: string;
  date?: string;
  workDone?: [
    {
      place?: string;
      timeInMin?: number;
      description?: string;
    }
  ];
}*/

export default Page;
