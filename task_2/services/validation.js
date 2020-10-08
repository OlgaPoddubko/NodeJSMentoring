import Joi from 'joi'

export function validate(data, isIdRequired = false){

  const primaryObject = {
    login: Joi.string().required(),
    password: Joi.string()
          .regex(/^(?=.*[A-Za-z])(?=.*\d)/)
          .required(),
    age: Joi.number()
          .integer()
          .min(4)
          .max(130)
          .required(),
    isDeleted: Joi.boolean().required(),
  };

  const validationObject = isIdRequired ? {...primaryObject, id: Joi.string().required()} : primaryObject ;

  const schema = Joi.object().keys(validationObject);

  return schema.validate(data).error;
}
