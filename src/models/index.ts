export interface IUserDetails {
    user_id: string;
    title: string;
    tags?: string[];
}

export interface IFieldValidator {
    fieldName: string;
    required?: boolean;
    maxLength?: number;
    type?: typeof String | typeof Number | typeof Array;
}