import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

import {ArchivedListModal} from "../components/Modals/ArchivedList";
import {setupStore} from "../redux";


const meta = {
    title: 'Notes/ArchivedListModal',
    component: ArchivedListModal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators : [
        (Story) => (<Provider store={setupStore()}><Story/></Provider>)
    ]
} satisfies Meta<typeof ArchivedListModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ArchivedList: Story = {
    args: {
        quantity: Math.ceil(Math.random() * 20) + 1,
    },
    
};