import { IFieldValidator, IUserDetails } from "../models";

export const validateUserDetails= (userDetails: IUserDetails, validators: IFieldValidator[]) => {
    const errors: Record<string, any> = {};


    validators.forEach(validator => {
        const fieldValue = userDetails[validator.fieldName as keyof IUserDetails];
        if(validator.required && !fieldValue ){
            errors[validator.fieldName] = `${validator.fieldName} is required`;
        }
        
        if(validator.maxLength && (Number(fieldValue?.length) > validator.maxLength)){
            errors[validator.fieldName] = `${validator.fieldName} must not be more than ${validator.maxLength}`;
        }
        
        if(userDetails.hasOwnProperty(validator.fieldName) && validator.type !== fieldValue?.constructor){
            errors[validator.fieldName] = `${validator.fieldName} should be of type ${validator.type?.name}`;
        }
        
    });

    Object.keys(userDetails).forEach(userField => {
        if(!validators.map(f => f.fieldName).includes(userField)){
            errors[userField] = `Invalid property ${userField}`;
        }
    })

    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
};


