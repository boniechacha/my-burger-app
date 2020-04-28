import Validation from "./Validation";

export default interface Form {
    [p: string]: {
        value: string,
        valid: boolean,
        changed: boolean,
        validation: Validation
    }
}