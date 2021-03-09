import QueryRepository from '../../domain/repositories/query_repository'

export default class QueryRepositoryImpl implements QueryRepository {
    _table?: string
    _where?: any | any[]
    _limit?: number
    _defaultLimit: number = 15
    _offset?: number
    _orderByTable?: string
    _orderByDirection: string = 'asc'


    datasource: any

    constructor(datasource: any) {
        this.datasource = datasource
    }

    table(table: string): void {
        this._table = table
    }

    where(args: any | any[]): void {
        this._where = args
    }

    limit(limit: number): void {
        this._limit = limit
    }

    page(page: number): void {
        if(!this._limit) {
            this.limit(this._defaultLimit);
        }

        if(!page || page <= 0) {
            page = 1
        }

        this._offset = ((this._limit || this._defaultLimit) * page) - (this._limit || this._defaultLimit)
    }

    order(table: string, direction: string = 'asc'): void {
        this._orderByTable = table
        this._orderByDirection = direction
    }

    async count(): Promise<number> {
        if(!this._table) {
            throw new Error('No table name');
        }

        let q = this.datasource(this._table);

        if(this._where) {
            q.where(this._where)
        }

        return (await q.count('* as total').first()).total;
    }

    async get(): Promise<any> {
        if(!this._table) {
            throw new Error('No table name');
        }

        let q = this.datasource(this._table);

        if(this._where) {
            q.where(this._where)
        }

        if(this._limit) {
            q.limit(this._limit)

            if(this._offset) {
                q.offset(this._offset)
            }
        }

        if(this._orderByTable) {
            q.orderBy(this._orderByTable, this._orderByDirection)
        }

        return await q;
    }

    async save(values: any): Promise<void> {
        return await this.datasource(this._table).insert(values)
    }
}