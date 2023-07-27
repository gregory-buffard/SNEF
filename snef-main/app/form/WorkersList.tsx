import React from 'react';

export interface SNEFWorker {
    _id: string;
    name: string;
    schedule: any[];
    interim: boolean;
    week: number;
}

interface WorkersListProps {
    workers: SNEFWorker[];
    setSelectedWorker: React.Dispatch<React.SetStateAction<SNEFWorker | null>>;
}

const WorkersList: React.FC<WorkersListProps> = ({ workers, setSelectedWorker }) => {
    return (
        <>
            {workers.map((worker, index) => (
                <div key={worker._id} className={'w-full flex justify-start items-center space-x-[1vw]'}>
                    <input
                        type="radio"
                        id={`worker-${index}`}
                        name="worker"
                        value={worker.name}
                        onChange={() => setSelectedWorker(worker)}
                    />
                    <p>{worker.name}</p>
                </div>
            ))}
        </>
    );
}

export default WorkersList;
