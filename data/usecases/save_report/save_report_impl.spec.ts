import { mockSaveReportFields } from "../../../domain/test/mock_save_report";
import { DbClientSpy } from "../../test/mock_db";
import { SaveReportImpl } from "./save_report_impl";
import faker from 'faker'
import { UnexpectedError } from "../../../domain/errors/unexpected";

type SutType = {
    table?: string
    error?: Error
}

const makeSut = ({table = faker.database.column(), error }: SutType) => {
    const dbClientSpy = new DbClientSpy<boolean>()

    if(error) {
        dbClientSpy.save = jest.fn()
            .mockImplementation(() => {
                throw error;
            })
    }

    const sut = new SaveReportImpl(table, dbClientSpy)
    return {
        sut,
        dbClientSpy
    }
}

describe('SaveReportImpl', () => {
    test('Should call DbClient with correct values', async () => {
        const table = 'fed'
        const { sut, dbClientSpy } = makeSut({table})
        const saveReportFields = mockSaveReportFields();

        await sut.save(saveReportFields);

        expect(dbClientSpy.table).toBe(table);
        expect(dbClientSpy.fields).toEqual(saveReportFields);
    });

    test('Should return true', async () => {
        const { sut, dbClientSpy } = makeSut({})
        dbClientSpy.response = {
            data: true
        }

        const report = await sut.save(mockSaveReportFields())
        expect(report).toEqual(true);
    });

    test('Should return false', async () => {
        const { sut, dbClientSpy } = makeSut({})
        dbClientSpy.response = {
            data: false
        }

        const report = await sut.save(mockSaveReportFields())
        expect(report).toEqual(false);
    });

    test('Should throw UnexpectedError', async () => {
        const { sut } = makeSut({ error: new UnexpectedError() })

        try {
            sut.save(mockSaveReportFields())
        } catch(err) {
            expect(err).rejects.toThrow(new UnexpectedError())
        }
    });
});