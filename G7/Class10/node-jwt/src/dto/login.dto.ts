import Joi from "joi";

export interface LoginDto {
  email: string;
  password: string;
}

const validatLoginDto = Joi.object<LoginDto>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default validatLoginDto;
