import { DbClient, DbRequest, DbResponse } from "../../data/db/client";
import knex from '../../config/db'

export class KnexDbClient implements DbClient {
    async save(data: DbRequest): Promise<DbResponse<boolean>> {
        let save = await knex
            .table(data.table)
            .insert(data.fields)

        return { data: Boolean(save) }
    }

}