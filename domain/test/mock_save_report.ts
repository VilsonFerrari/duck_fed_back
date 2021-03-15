import { SaveReport } from "../usecases/save_report";
import faker from 'faker'
import { mockReportModel } from "./mock_report";

export const mockSaveReportFields = (): SaveReport.Fields => ({
    where: faker.address.streetAddress(true),
    food: "Hot Dog",
    food_amount: faker.random.number(100),
    food_kind: "Trash Food",
    how_many_ducks: faker.random.number(15),
    feed_at: faker.date.past()
})

export const mockSaveReportModel = (): SaveReport.Model => mockReportModel()

export class SaveReportSpy implements SaveReport {
    callsCount = 0
    
    async save(fields: SaveReport.Fields): Promise<boolean> {
        this.callsCount++
        return true
    }
}