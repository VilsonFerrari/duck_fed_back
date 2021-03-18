import { ReportModel } from "../models/report_model"

export interface ListReport {
    list: (options: ListReport.Params) => Promise<ListReport.Model>
}

export namespace ListReport {
    export type Params = {
        p?: number
        limit?: number
        order?: {
            table: string
            direction: string
        }
    }
    
    export type Model = {
        page: number
        lastPage: number
        total: number
        limit: number
        offset: number
        result: ReportModel[]
    }
}
