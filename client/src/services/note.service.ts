import {axiosService} from "./axios.service";
import {IRes} from "../types";
import {INote, INoteDTO, IStatistic} from "../interfaces";
import {urls} from "../constants";

const noteService = {
    getAll: (): IRes<{ active: INote[], archived: INote[] }> => axiosService.get(urls.notes.notes),
    create: (note: INoteDTO): IRes<INote> => axiosService.post(urls.notes.notes, note),
    updateById: (id: number, note: INoteDTO): IRes<INote[]> => axiosService.patch(urls.notes.byId(id), note),
    delete: (id: number): IRes<void> => axiosService.delete(urls.notes.byId(id)),
    archiveById: (id: number): IRes<INote[]> => axiosService.get(urls.notes.archiveById(id)),
    unarchiveById: (id: number): IRes<INote[]> => axiosService.get(urls.notes.unarchiveById(id)),
    statistics: (): IRes<IStatistic> => axiosService.get(urls.notes.statistics),
};

export {
    noteService,
};