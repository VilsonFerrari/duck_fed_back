import faker from 'faker'
import { DbClient, DbList, DbResponse, DbSave } from '../db/client'

export const mockDbSave = (): DbSave => ({
    table: faker.database.column(), // It is a faker...
    fields: faker.random.objectElement()
})

export class DbClientSpy<R = any> implements DbClient<R> {
    table?: string
    fields?: any
    page?: number
    limit?: number
    order?: {
        table: string
        direction: string
    }

    response: DbResponse<R> = {}

    async save(data: DbSave): Promise<DbResponse<R>> {
        this.table = data.table
        this.fields = data.fields
        return this.response
    }

    async list(params: DbList): Promise<DbResponse<R>> {
        this.table = params.table
        this.limit = params.limit
        this.order = params.order
        this.page = params.page
        return this.response
    }
}