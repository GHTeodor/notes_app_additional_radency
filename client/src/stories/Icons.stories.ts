import {Meta, StoryObj} from "@storybook/react";
import {Icons} from "../components/Icons";

const meta = {
    title: 'Notes/Icons',
    component: Icons,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Icons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Task: Story = {
    args: {
        category: "Task",
    },
};

export const Quote: Story = {
    args: {
        category: "Quote",
    },
};

export const Idea: Story = {
    args: {
        category: "Idea",
    },
};

export const RandomThought: Story = {
    args: {
        category: "Random Thought",
    },
};

export const Default: Story = {
    args: {
        category: "Default",
    },
};