import Joi from "joi";

export interface RegisterDto {
  email: string;
  password: string;
}

const validateRegisterDto = Joi.object<RegisterDto>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export default validateRegisterDto;
