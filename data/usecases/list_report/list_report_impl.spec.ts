import { DbClientSpy } from "../../test/mock_db";
import faker from 'faker'
import { UnexpectedError } from "../../../domain/errors/unexpected";
import { ListReportImpl } from "./list_report_impl";
import { ListReport } from "../../../domain/usecases/list_reports";
import { mockListReportModel, mockListReportParams } from "../../../domain/test/mock_list_report";

type SutType = {
    table?: string
    error?: Error
}

const makeSut = ({table = faker.database.column(), error }: SutType) => {
    const dbClientSpy = new DbClientSpy<ListReport.Model>()

    if(error) {
        dbClientSpy.list = jest.fn()
            .mockImplementation(() => {
                throw error;
            })
    }

    const sut = new ListReportImpl(table, dbClientSpy)
    return {
        sut,
        dbClientSpy
    }
}

describe('ListReportImpl', () => {
    test('Should call DbClient with correct values', async () => {
        const table = 'fed'
        const { sut, dbClientSpy } = makeSut({table})
        const listReportParams = mockListReportParams();

        await sut.list(listReportParams);

        expect(dbClientSpy.table).toBe(table);
        expect(dbClientSpy.limit).toEqual(listReportParams.limit);
        expect(dbClientSpy.order).toEqual(listReportParams.order);
        expect(dbClientSpy.page).toEqual(listReportParams.p);
    });

    test('Should return ListReport.Model', async () => {
        const { sut, dbClientSpy } = makeSut({})
        const result = mockListReportModel()
        dbClientSpy.response = {
            data: result
        }

        const report = await sut.list(mockListReportParams())
        expect(report).toEqual(result);
    });

    test('Should throw UnexpectedError', async () => {
        const { sut } = makeSut({ error: new UnexpectedError() })

        try {
            sut.list(mockListReportParams())
        } catch(err) {
            expect(err).rejects.toThrow(new UnexpectedError())
        }
    });
});