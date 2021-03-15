import { Request, Response } from 'express'
import allowCors from '../config/cors'
import { SaveReportImpl } from '../data/usecases/save_report/save_report_impl'
import { KnexDbClient } from '../infra/db/knex_db_client'

const Save = async ({ body }: Request, res: Response) => {
    const dbClient = new KnexDbClient();
    const save = new SaveReportImpl('fed', dbClient);

    let response = await save.save(body);
    res.send(response);
}

export default allowCors(Save)