import { array, mixed, object, string } from 'yup';

export const noteSchema = object({
  // id: number().required().positive(),
  name: string().required().trim(),
  // created: string().required().trim(),
  category: mixed()
    .oneOf(['Task', 'Random Thought', 'Idea', 'Quote'] as const)
    .defined(),
  content: string().required().trim(),
  dates: array(string().nullable()),
});
