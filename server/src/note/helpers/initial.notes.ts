export interface InitialNotes {
  // id: number;
  name: string;
  // created: string;
  category: string;
  content: string;
  dates: string[];
}

export const initialNotes: InitialNotes[] = [
  {
    name: 'Shopping list',
    category: 'Task',
    content: 'Tomatoes, bread',
    dates: [],
  },
  {
    name: 'The theory of evolution',
    category: 'Random Thought',
    content: 'The evolution',
    dates: [],
  },
  {
    name: 'New Feature',
    category: 'Idea',
    content: 'Implement new ...',
    dates: ['3/5/2021', '5/5/2021'],
  },
  {
    name: 'William Gaddis',
    category: 'Quote',
    content: "Power doesn't corrupt people; people corrupt power.",
    dates: [],
  },
  {
    name: 'Books',
    category: 'Task',
    content: 'The lean startup',
    dates: [],
  },
  {
    name: 'Marcus Tullius Cicero',
    category: 'Quote',
    content: 'A room without books is like a body without a soul',
    dates: [],
  },
  {
    name: 'Mae West',
    category: 'Quote',
    content: 'You only live once, but if you do it right, once is enough',
    dates: [],
  },
];
