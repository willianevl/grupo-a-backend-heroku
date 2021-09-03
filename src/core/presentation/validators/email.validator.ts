import validator from 'validator';
import { InvalidParamError } from '..';


export class EmailValidator{
    readonly #fieldName: string;

    constructor(fieldName: string){
        this.#fieldName = fieldName;
    }

    public validate(input: any): Error | undefined {
        if(!validator.isEmail(input[this.#fieldName])){
            return new InvalidParamError(this.#fieldName);
        }
    }
}