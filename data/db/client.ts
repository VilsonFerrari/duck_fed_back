export type DbSave = {
    table: string
    fields: any
}

export type DbList = {
    table: string
    limit?: number
    page?: number
    order?: {
        table: string
        direction: string
    }
}

export interface DbClient<R = any> {
    save: (data: DbSave) => Promise<DbResponse<R>>
    list: (params: DbList) => Promise<DbResponse<R>>
}

export type DbResponse<T = any> = {
    data?: T
}