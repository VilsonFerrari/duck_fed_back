import { Request, Response } from 'express'
import allowCors from '../config/cors'
import knex from '../config/db'
import QueryRepositoryImpl from '../query_builder/infra/repositories/query_repository_impl'

const Get = async ({ query }: Request, res: Response) => {
    const { p, limit, order } = query as any

    const q = new QueryRepositoryImpl(knex)
    q.table('fed')

    if(limit) {
        q.limit(limit)
    }

    if(p) {
        q.page(p)
    }

    if(order) {
        const { table, direction } = JSON.parse(order)
        q.order(table, direction)
    }

    let total = await q.count()
    let val = await q.get()

    // Test API delay
    setTimeout(() => {
        res.send({
            page: p,
            lastPage: Math.round(total / (q._limit || q._defaultLimit)),
            total,
            limit: q._limit,
            offset: q._offset,
            result: val
        })
    }, 1500);
    
}

export default allowCors(Get)