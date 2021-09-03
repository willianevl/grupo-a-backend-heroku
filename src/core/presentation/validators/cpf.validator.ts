import { InvalidParamError } from '..';
import { isValidCPF } from '../../../utils';


export class CpfValidator{
    readonly #fieldName: string;

    constructor(fieldName: string){
        this.#fieldName = fieldName;
    }

    public validate(input: any): Error | undefined {
        if(!isValidCPF(input[this.#fieldName])){
            return new InvalidParamError(this.#fieldName);
        }
    }
}