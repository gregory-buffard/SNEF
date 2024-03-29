import React from 'react';
import mergeSchedules from "./mergeSchedules";
import axios from "axios";

export interface SNEFWorker {
    _id: string;
    name: string;
    schedule: any[];
    interim: boolean;
    week: number;
}

interface WorkersListProps {
    workers: SNEFWorker[];
    setGroupWorker: React.Dispatch<React.SetStateAction<string>>;
}

const getWeekNumber = (d: Date): number => {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil(
        ((date.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7
    );
}

const WorkersList:any = ({workers, setGroupWorker, setData, setInterim}:any) => {
    const fetchSchedule = (worker:string) => {
        console.log(worker)
        if (worker.length > 0) {
            console.log(worker)
            axios.get(`https://api.snef.cloud/worker/?name=${worker}`).then((userRes) => {
                    setInterim(userRes.data.interim);
                    axios.get('https://api.snef.cloud/getWorkspaces').then((dbRes) => {
                        const mergedSchedules = mergeSchedules(dbRes.data, userRes.data.schedule || []);
                        setData({
                            name: worker,
                            schedule: mergedSchedules,
                        })
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            )
        } else console.log('No worker selected')
    }

    return (
        <>
            {workers.length > 0 ? workers.map((worker:any, index:any) => {
                return (
                    <div key={worker._id} className={'w-full flex justify-between items-center space-x-[1vw] bg-neutral-200 rounded-[0.5vw] px-[0.75vw] py-[0.5vh] my-[0.5vh] accent-snef iP:space-x-[2vh] iP:bg-transparent iP:w-10/12'}>
                        <div className={'flex justify-start items-center space-x-[1vw] iP:space-x-[2vh]'}>
                            <input
                                type="radio"
                                id={`worker-${index}`}
                                name="worker"
                                value={worker.name}
                                onChange={async () => {
                                    setGroupWorker(worker.name);
                                    await fetchSchedule(worker.name);
                                }}
                                className={'cursor-pointer iP:w-[2vh] iP:h-[2vh]'}
                            />
                            <p>{worker.name}</p>
                        </div>
                        <div className={`w-[0.5vw] h-[0.5vw] iP:w-[1vh] iP:h-[1vh] rounded-full ${worker.week === getWeekNumber(new Date()) ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    </div>
                    )
            }) : <></>}
        </>
    );
}

export default WorkersList;