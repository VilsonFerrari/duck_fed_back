import { DbClient, DbList, DbResponse, DbSave } from "../../data/db/client";
import knex from '../../config/db'
import { ListReportImpl } from "../../data/usecases/list_report/list_report_impl";

export class KnexDbClient implements DbClient {
    private _defaultPage = 1
    private _defaultLimit = 15

    async save(data: DbSave): Promise<DbResponse<boolean>> {
        let save = await knex
        .table(data.table)
        .insert(data.fields)
        
        return { data: Boolean(save) }
    }
    
    async list(params: DbList): Promise<DbResponse<ListReportImpl.Model>> {
        const { table, page = this._defaultPage, limit = this._defaultLimit, order } = params
        
        let query = knex(table)
        query.limit(limit)
        query.offset((limit * page) - limit)

        if(order) {
            const { table, direction } = order
            if(table && direction) {
                query.orderBy(table, direction)
            }
        }

        let result = await query
        let total = ((await query.count('* as total').first())?.total ?? 0) as any as number
        
        return {
            data: {
                page: page || 0,
                lastPage: Math.round(total / limit),
                limit,
                offset: (limit * page) - limit,
                total,
                result
            }
        }
    }
}