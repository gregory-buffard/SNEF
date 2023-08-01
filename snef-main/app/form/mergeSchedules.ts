const mergeSchedules = (initSchedule: any, userSchedule: any) => {
    userSchedule = new Map(userSchedule.map((item: any) => [item.name, item]));

    return initSchedule.map((workspace: any) => userSchedule.get(workspace.name) || workspace);
};

export default mergeSchedules;