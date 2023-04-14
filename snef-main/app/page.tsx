"use client";
import axios from "axios";
import React, {useState} from "react";
export default function Page() {
    const [name, setName] = useState<string>("")
    const [data, setData] = useState<IFile>({name: ""})

    const handleReq = () => {
        axios.post("/api/requestFile", {name}).then(r => console.log(r.data))
    }



    return (
        <div>
            <div>
                <h2>Get</h2>
            <input type="text" onChange={e => setName(e.target.value)}/>
            <button onClick={handleReq}>Click me</button>
            </div>
            <div>
                <h2>Post</h2>
                FIX
                <input type="text" onChange={e => setData({...data, name: e.target.value})}/>
                <input type="text" onChange={e => setData({...data, date: e.target.value})}/>

                <input type="text" onChange={e => setData({...data, workDone: [{place: e.target.value}]})}/>
                <input type="text" onChange={e => setData({...data, workDone: [{timeInMin: Number(e.target.value)}]})}/>
                <input type="text" onChange={e => setData({...data, workDone: [{description: e.target.value}]})}/>

                <button onClick={() => axios.post("http://localhost:5000/api/updateWorker", data).then(e => console.log(e.data))}>Click me</button>



            </div>
        </div>

    )
}

interface IFile {
    name: string
    date?: string
        workDone?: [{
            place?: string;
            timeInMin?: number;
            description?: string;
        }]
}