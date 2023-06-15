import jwt from "jsonwebtoken";
import 'dotenv/config'
import config from 'config'
const private_key:string = config.get<string>("privateKey")

const public_key:string =  config.get<string>("publicKey")


export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, private_key, {
    ...(options && options)
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, public_key);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}