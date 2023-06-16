interface Worker {
    _id?: string;
    name?: string;
    schedule?: Schedule[]
}

export interface Schedule {
    date?: Date,
    workDone?: [{
        place?: string;
        hours?: number;
    }]
}
export default Worker

