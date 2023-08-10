import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

import NoteFormModal from "../components/Modals/NoteFormModal";
import {setupStore} from "../redux";


const meta = {
    title: 'Notes/FormModal',
    component: NoteFormModal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators : [
        (Story) => (<Provider store={setupStore()}><Story/></Provider>)
    ]
} satisfies Meta<typeof NoteFormModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {
    args: {},
};

export const Edit: Story = {
    args: {
        note: {
            id: 1,
            name: 'Shopping list',
            category: 'Task',
            content: 'Tomatoes, bread',
            dates: [],
            createdAt: '2023-08-09',
        },
    },
};