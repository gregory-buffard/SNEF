export interface Worker {
    _id?: string;
    name?: string;
    email?: string;
    schedule?: [Schedule]
}

export interface Schedule {
    date?: Date;
    workDone?: [{
        place?: string;
        timeInMin?: number;
        description?: string;
    }]
}

