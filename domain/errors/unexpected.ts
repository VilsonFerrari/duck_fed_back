export class UnexpectedError extends Error {
    constructor(
        private readonly msg: string = 'Something went wrong!'
    ) {
        super(msg);
        this.name = 'UnexpectedError'
    }
}