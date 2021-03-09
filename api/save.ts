import { Request, Response } from 'express'
import allowCors from '../config/cors'
import knex from '../config/db'
import QueryRepositoryImpl from '../query_builder/infra/repositories/query_repository_impl'

const Save = async ({ body }: Request, res: Response) => {
    const q = new QueryRepositoryImpl(knex)
    q.table('fed')
    let save = await q.save(body)
    
    if(save) {
        res.send(true)
    } else {
        res.send(false)
    }
}

export default allowCors(Save)