import React, {FC} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Archive, DeleteForever, Unarchive} from "@mui/icons-material";

import {useAppSelector} from "../hooks";
import {Note} from "./Note";
import NoteFormModal from "./Modals/NoteFormModal";
import {theadSummary} from "../constants";
import {SummaryTBody} from "./SummaryTBody";
import {INote} from "../interfaces";

interface IProps {
    thead: string[];
    isArchived?: boolean;
}

const NotesTable: FC<IProps> = ({thead: keysList, isArchived = false}) => {
    const {notes, archived, currentArchivedCategory} = useAppSelector(state => state.noteSlice);
    const archivedByCategory = archived.filter(note => note.category === currentArchivedCategory);

    const isSummary: boolean = keysList.length === theadSummary.length;

    return (
        <div className="w-full">
            <Paper>
                <TableContainer>
                    <Table className="table-auto">
                        <TableHead className="bg-gradient-to-r from-gray-500 to-gray-400 border-4 border-white">
                            <TableRow>
                                {keysList.map((k, i) =>
                                    <TableCell key={i}>
                                        {k
                                            ? k
                                            : isArchived ? <Unarchive/> :
                                                <div className="flex justify-end items-center">
                                                    <Archive/> <DeleteForever/>
                                                </div>}
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>


                        <TableBody className="bg-gradient-to-tr from-slate-400 to-gray-200">
                            {
                                (isSummary)
                                    ? <SummaryTBody/>
                                    : (isArchived ? archivedByCategory : notes).map((note: INote) =>
                                        <Note key={note.id} note={note} isArchived={isArchived}/>)
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/*Create Modal*/}
            {
                !isArchived && !isSummary && <NoteFormModal/>
            }
        </div>
    );
};

export {NotesTable};