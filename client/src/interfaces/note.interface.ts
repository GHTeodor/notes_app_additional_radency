export interface INote {
    id: number,
    name: string,
    createdAt: string,
    category: string,
    content: string,
    dates: IDate[],
}

export interface INoteDTO {
    name: string,
    category: string,
    content: string,
    dates: [string],
}

interface IDate {
    date: string;
}