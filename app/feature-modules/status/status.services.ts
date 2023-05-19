import statusRepo from "./status.repo";
import { IStatus } from "./status.types";

const createStatus = async (status: IStatus) => {
    const newStatus = await statusRepo.create(status);
    return newStatus;
}

export default {
    createStatus
}