import faker from 'faker'
import { ReportModel } from '../models/report_model'

export const mockReportModel = (): ReportModel => ({
    id: faker.random.number().toString(),
    where: faker.address.streetAddress(true),
    food: "Hot Dog",
    food_amount: faker.random.number(100),
    food_kind: "Trash Food",
    how_many_ducks: faker.random.number(15),
    feed_at: faker.date.past(),
    created_at: faker.date.past()
})