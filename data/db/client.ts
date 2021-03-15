export type DbRequest = {
    table: string,
    fields?: any
}

export interface DbClient<R = any> {
    save: (data: DbRequest) => Promise<DbResponse<R>>
}

export type DbResponse<T = any> = {
    data?: T
}