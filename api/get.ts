import { Request, Response } from 'express'
import allowCors from '../config/cors'
import { ListReportImpl } from '../data/usecases/list_report/list_report_impl'
import { KnexDbClient } from '../infra/db/knex_db_client'

const Get = async ({ query }: Request, res: Response) => {
    const dbClient = new KnexDbClient();
    const list = new ListReportImpl('fed', dbClient);

    const { limit, p, order } = query
    let response = await list.list({
        p: p as any as number, 
        limit: limit as any as number, 
        order: JSON.parse(order as any)
    });
    res.send(response);
    
}

export default allowCors(Get)