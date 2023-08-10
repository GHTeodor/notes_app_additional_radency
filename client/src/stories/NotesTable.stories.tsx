import React from 'react';
import { Provider } from 'react-redux';
import {Meta, StoryObj} from '@storybook/react';

import {setupStore} from "../redux";
import {NotesTable} from "../components";

const meta = {
    title: 'Notes/NotesTable',
    component: NotesTable,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (<Provider store={setupStore()}>
            <Story/>
        </Provider>)
    ]
} satisfies Meta<typeof NotesTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotesList: Story = {
    args: {
        thead: [' ', 'Name', 'Created', 'Category', 'Content', 'Dates', ''],
        isArchived: false,
    },
};

export const ArchivedNotesList: Story = {
    args: {
        thead: [' ', 'Name', 'Created', 'Category', 'Content', 'Dates', ''],
        isArchived: true,
    },
};

export const SummaryList: Story = {
    args: {
        thead: ["Note Category", "Active", "Archived"],
        isArchived: false,
    },
};