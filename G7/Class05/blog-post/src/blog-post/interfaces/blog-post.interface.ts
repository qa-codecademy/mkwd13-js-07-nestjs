export interface BlogPost {
    id: string,
    title: string,
    content: string,
    author?: string,
    tags?: string[],
    createdAt: Date,
    updatedAt: Date | null
}