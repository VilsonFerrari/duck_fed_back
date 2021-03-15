import faker from 'faker'
import { DbClient, DbRequest, DbResponse } from '../db/client'

export const mockDbRequest = (): DbRequest => ({
    table: faker.database.column(), // It is a faker...
    fields: faker.random.objectElement()
})

export class DbClientSpy<R = any> implements DbClient<R> {
    table?: string
    fields?: any
    response: DbResponse<R> = {}

    async save(data: DbRequest): Promise<DbResponse<R>> {
        this.table = data.table
        this.fields = data.fields
        return this.response
    }
}