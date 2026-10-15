import { Todos } from './kanban';

export const todos: Todos[] = [
  {
    id: 1,
    title: 'Launch new template',
    description: '',
    date: '4 july',
    taskProperty: 'Design',
    imageUrl: '/assets/images/taskboard/kanban-img-1.jpg',
  },
  {
    id: 2,
    title: 'Book a Ticket',
    description: 'Blandit tempus porttitor aasfs.',
    date: '24 july',
    taskProperty: 'Mobile',
    imageUrl: '',
  },
  {
    id: 3,
    title: 'Task review',
    description: '',
    class: 'task-status-info',
    date: '14 july',
    taskProperty: 'UX Stage',
    imageUrl: '',
  },
];

export const inprogress: Todos[] = [
  {
    id: 201,
    title: 'Website Design',
    description: '',
    date: '14 july',
    taskProperty: 'Research',
    imageUrl: '',
  },
  {
    id: 202,
    title: 'Angular 5 material',
    description:'',
    class: 'task-status-danger',
    date: '24 july',
    taskProperty: 'Data Science',
    imageUrl: '/assets/images/taskboard/kanban-img-2.jpg',
  },
  {
    id: 203,
    title: 'Horizontal Layoutbug',
    description: '',
    class: 'task-status-info',
    date: '10 july',
    taskProperty: 'UX Stage',
    imageUrl: '',
  },
];

export const completed: Todos[] = [
  {
    id: 301,
    title: 'Design work',
    description:'',
    date: '11 july',
    taskProperty: 'Data Science',
    imageUrl: '/assets/images/taskboard/kanban-img-3.jpg',
  },
  {
    id: 302,
    title: 'Meeting with team',
    description: '',
    class: 'task-status-success',
    date: '12 july',
    taskProperty: 'Branding',
    imageUrl: '',
  },
  {
    id: 303,
    title: 'Material Pro angular',
    description: '',
    date: '15 july',
    taskProperty: 'Research',
    imageUrl: '',
  },
  {
    id: 304,
    title: 'Learning Angular 5',
    description: 'Task is now completed to learn angular5',
    class: 'task-status-success',
    date: '26 july',
    taskProperty: 'Design',
    imageUrl: '',
  },
];

export const onhold: Todos[] = [
  {
    id: 401,
    title: 'Use gradient or not',
    description: 'Need approval on whether to use gradient or make it plain',
    date: '12 july',
    taskProperty: 'Branding',
    imageUrl: '',
  },
  {
    id: 402,
    title: 'Give review on the product',
    description: '',
    class: 'task-status-danger',
    date: '11 july',
    taskProperty: 'Mobile',
    imageUrl: '/assets/images/taskboard/kanban-img-4.jpg',
  },
];
