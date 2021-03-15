import { UnexpectedError } from "../../../domain/errors/unexpected";
import { SaveReport } from "../../../domain/usecases/save_report";
import { DbClient } from "../../db/client";

export class SaveReportImpl implements SaveReport {
    constructor(
        private readonly table: string,
        private readonly dbClient: DbClient<boolean>
    ) {}

    async save(fields: SaveReport.Fields): Promise<boolean> {
        try {
            const dbResponse = await this.dbClient.save({
                table: this.table,
                fields: fields,
            });
    
            return Boolean(dbResponse.data);
        } catch(err) {
            throw new UnexpectedError(err);
        }

    }

}

export namespace SaveReportImpl {
    export type Model = SaveReport.Model;
}