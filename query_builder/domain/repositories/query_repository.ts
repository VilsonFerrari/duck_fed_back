export default interface QueryRepository {
    tableName?: string;
    whereCondition?: any | any[]

    get(): Promise<any>
}