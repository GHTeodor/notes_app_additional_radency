import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, FormHelperText, InputLabel, MenuItem, Select,
    TextField
} from '@mui/material';
import {DoneOutline, Close, EditNote} from '@mui/icons-material';
import dayjs from "dayjs";

import {INote, INoteDTO} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import useInput from "../../hooks/input.hook";
import {noteActions} from "../../redux/slice";
import Transition from "./Transition";

interface IProps {
    note?: INote;
}

const NoteFormModal: FC<IProps> = ({note}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //
    const [error, setError] = useState("");
    const dispatch = useAppDispatch();

    const buttonSubmitRef = useRef<HTMLInputElement>(null);

    const {reset: resetName, ...name} = useInput(note?.name);
    const {reset: resetCategory, ...category} = useInput(note?.category);
    const {reset: resetContent, ...content} = useInput(note?.content);
    const {reset: resetDates, ...selectedDate} = useInput();

    const create = () => {
        const date = dayjs(selectedDate?.value).format("DD/MM/YYYY");

        const newNote: INoteDTO = {
            name: name.value,
            category: category.value,
            content: content.value,
            dates: [date],
        };

        dispatch(noteActions.create({note: newNote}));
    }

    const edit = (note: INote) => {
        const date = dayjs(selectedDate?.value).format("DD/MM/YYYY");

        const editNote: INoteDTO = {
            ...note,
            name: name.value,
            content: content.value,
            dates: [date],
        };

        dispatch(noteActions.update({note: editNote, id: note.id}));
    };

    const middleware = useCallback(() => {
        const regexName = /^[a-zA-Z\s]{2,30}$/;
        const regexCategory = /^[a-zA-Z\s]{2,20}$/;
        const regexContent = /^[\w\s\d.,'"`;:?!]{2,200}$/;

        let errors = "";

        try {
            if (!regexName.test(name.value.trim()))
                throw new Error(JSON.stringify("Name is required. Length 2-30 Symbols. Only En letters. "));
        } catch (e: any) {
            errors += e.message;
        }

        try {
            if (!regexCategory.test(category.value.trim()))
                throw new Error("Category is required. Chose option. ");
        } catch (e: any) {
            errors += e.message;
        }

        try {
            if (!regexContent.test(content.value.trim()))
                throw new Error("Content is required. Length 2-200 Symbols. En+digits. ");
        } catch (e: any) {
            errors += e.message;
        }
        setError(errors);

        return regexName.test(name.value.trim()) && regexCategory.test(category.value.trim()) && regexContent.test(content.value.trim());
    }, [name.value, content.value, category.value]);

    useEffect(() => {
        if (middleware()) setError("");
    }, [middleware, name.value, content.value, category.value]);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (error) return;

        note ? edit(note) : create();
    };

    const buttonRefClick = () => {
        buttonSubmitRef.current?.click();
        if (!error) {
            resetName();
            resetContent();
            resetCategory();
            resetDates();

            handleClose();
        }
    };

    return (
        <div className="flex justify-end m-2.5">
            {
                !note
                    ? <Button variant="contained" onClick={handleClickOpen}> Create Note</Button>
                    : <Button variant="outlined" onClick={handleClickOpen}><EditNote/></Button>
            }

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                maxWidth="xl"
            >
                <DialogTitle className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                    <span className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        {!note ? "Create New" : "Edit"} Note
                    </span>
                </DialogTitle>
                <DialogContent className="bg-gradient-to-tr from-slate-200 to-gray-100">
                    <form onSubmit={handleSubmit} className="bg-gradient-to-tr from-slate-100 to-orange-100 p-1 rounded-lg">
                        <FormControl fullWidth className="m-2.5" error={Boolean(error)}>
                            {error &&
                                <FormHelperText className="max-w-[300px] break-words">
                                    {error}
                                </FormHelperText>}
                        </FormControl>

                        <FormControl fullWidth className="m-2.5">
                            <TextField
                                label="Name"
                                variant="outlined"
                                margin="normal"
                                {...name}
                            />
                        </FormControl>

                        <FormControl fullWidth className="m-2.5">
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Category"
                                {...category}
                                disabled={!!note}
                            >
                                <MenuItem value={"Task"}>Task</MenuItem>
                                <MenuItem value={"Random Thought"}>Random Thought</MenuItem>
                                <MenuItem value={"Idea"}>Idea</MenuItem>
                                <MenuItem value={"Quote"}>Quote</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth className="m-2.5">
                            <TextField
                                label="Content"
                                variant="outlined"
                                margin="normal"
                                {...content}
                                multiline
                            />
                        </FormControl>

                        <FormControl fullWidth className="m-2.5">
                            <TextField
                                label="Select Date"
                                type="date"
                                fullWidth
                                margin="normal"
                                {...selectedDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>

                        <input type="submit" ref={buttonSubmitRef} hidden/>
                    </form>
                </DialogContent>
                <DialogActions className="bg-gradient-to-bl from-indigo-200 from-10% via-sky-200 via-30% to-emerald-200 to-90%">
                    <Button type="reset" onClick={handleClose}><Close/></Button>
                    <Button type="reset" onClick={buttonRefClick}><DoneOutline/></Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NoteFormModal;