export class StudentAlreadyExistsError extends Error {
    constructor(paramName: string){
        super(`Student already exists with this ${paramName}`);
        this.name = 'StudentAlreadyExistsError';
    };
};