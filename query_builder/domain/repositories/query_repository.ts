export default interface QueryRepository {
    get(): Promise<any>
    save(values: any): Promise<boolean>
}