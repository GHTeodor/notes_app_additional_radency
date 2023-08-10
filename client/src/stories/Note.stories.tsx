import React from 'react';
import { Provider } from 'react-redux';
import {Meta, StoryObj} from '@storybook/react';

import {setupStore} from "../redux";
import {Note} from "../components";

const meta = {
    title: 'Notes/Note',
    component: Note,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (<Provider store={setupStore()}>
            <Story/>
        </Provider>)
    ]
} satisfies Meta<typeof Note>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoteActive: Story = {
    args: {
        note: {
            id: 1,
            name: 'Shopping list',
            category: 'Task',
            content: 'Tomatoes, bread',
            dates: [],
            createdAt: '2023-08-09',
        },
        isArchived: false,
    },
};

export const NoteArchived: Story = {
    args: {
        note: {
            id: 1,
            name: 'Shopping list',
            category: 'Task',
            content: 'Tomatoes, bread',
            dates: [],
            createdAt: '2023-08-09',
        },
        isArchived: true,
    },
};