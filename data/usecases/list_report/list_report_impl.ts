import { UnexpectedError } from "../../../domain/errors/unexpected";
import { ListReport } from "../../../domain/usecases/list_reports";
import { DbClient } from "../../db/client";

export class ListReportImpl implements ListReport {
    constructor(
        private readonly table: string,
        private readonly dbClient: DbClient
    ) {}

    async list(params: ListReport.Params): Promise<ListReport.Model> {
        try {
            const { p, limit, order } = params

            const dbResponse = await this.dbClient.list({
                table: this.table,
                page: p,
                limit: limit,
                order: order
            });

            return dbResponse.data!
    
        } catch(err) {
            throw new UnexpectedError(err);
        }

    }

}

export namespace ListReportImpl {
    export type Model = ListReport.Model;
}