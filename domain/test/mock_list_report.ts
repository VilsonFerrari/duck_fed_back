import { ListReport } from "../usecases/list_reports";
import faker from 'faker'
import { mockReportModel } from "./mock_report";

export const mockListReportParams = (): ListReport.Params => ({
    p: faker.random.number(),
    limit: faker.random.number(),
    order: {
        table: 'feed_at',
        direction: 'asc'
    }
})

export const mockListReportModel = (): ListReport.Model => ({
    page: 1,
    lastPage: 1,
    total: 3,
    limit: 3,
    offset: 0,
    result: [
        mockReportModel(),
        mockReportModel(),
        mockReportModel()
    ]
})

export class ListReportSpy implements ListReport {
    callsCount = 0
    
    async list(fields: ListReport.Params): Promise<ListReport.Model> {
        this.callsCount++
        return mockListReportModel()
    }
}