import { ReportModel } from "../models/report_model"

export interface SaveReport {
    save: (fields: SaveReport.Fields) => Promise<boolean>
}

export namespace SaveReport {
    export type Fields = {
        where: string
        how_many_ducks: number
        food: string
        food_kind: string
        food_amount: number
        feed_at: Date
    }
    
    export type Model = ReportModel
}
