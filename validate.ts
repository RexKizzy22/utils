// import joi from "joi";
// import { Data } from "../dataModel/dataModel";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

export const authComp = (body: Data) => {
  const schema = joi.object({
    organization: joi.string().required(),
    products: joi.array().required(),
    marketValue: joi.string().required(),
    address: joi.string().required(),
    ceo: joi.string().required(),
    country: joi.string().required(),
    noOfEmployees: joi.number().required(),
    employees: joi.array().required(),
  });
  return schema.validate(body);
};

export const authId = (id: Record<string, any>) => {
  const schema = joi.object({
    id: joi.string().required(),
  });
  return schema.validate(id);
};

export const compError = (body: Record<string, any>) => {
  const schema = joi.object({
    organization: joi.string().error(() => new Error("must be a string")),
    products: joi.array().error(() => new Error("must be a array")),
    marketValue: joi.string().error(() => new Error("must be a string")),
    address: joi.string().error(() => new Error("must be a string")),
    ceo: joi.string().error(() => new Error("must be a string")),
    country: joi.string().error(() => new Error("must be a string")),
    noOfEmployees: joi.number().error(() => new Error("must be a number")),
    employees: joi.array().error(() => new Error("must be a array")),
  });
  return schema.validate(body);
};

export const authQueryString = (request: Record<string, any>) => {
  const schema = joi.object({
    page: joi.number().required(),
    limit: joi.string().required(),
  });

  return schema.validate(request);
};

export const authSignup = (body: Record<string, any>) => {
  const schema = joi
    .object({
      name: joi
        .string()
        .pattern(new RegExp("^[a-zA-Z]{2,}\\s[a-zA-z]{2,}$"))
        .required(),
      password: joi
        .string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: joi.ref("password"),
      email: joi.string().email().required(),
    })
    .with("password", "repeat_password");

  return schema.validate(body);
};

export const authLogin = (body: Record<string, any>) => {
  const schema = joi.object({
    password: joi.string().required(),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
  });

  return schema.validate(body);
};

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

export const comparePassword = (
  hashedPassword: string,
  password: string
): boolean => {
  if (!hashedPassword || !password) return false;
  return bcrypt.compareSync(password, hashedPassword);
};

export const generateToken = (id: number): string => {
  const token = jwt.sign(
    {
      userID: id,
    },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "3h" }
  );
  return token;
};
