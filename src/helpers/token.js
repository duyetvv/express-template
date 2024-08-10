import fs from 'fs';
import jwt from 'jsonwebtoken';
import uuidv4 from 'uuid/v4';

import { token as tokenOpts } from '../config';
import { priKeyPath, pubKeyPath } from '../jwtcert';

const privateKey = fs.readFileSync(priKeyPath);
const publicKey = fs.readFileSync(pubKeyPath);


export const generateAccessToken = (user, sign) => {
  const payload = { ...user, sign };

  return jwt.sign(payload, privateKey, tokenOpts);
}

export const generateToken = (user) => {
  const sign = uuidv4();

  return {
    refresh_token: sign,
    access_token: generateAccessToken(user, sign),
  };
}

export const verifyAccessToken = (token) => {
  return jwt.verify(token, publicKey, tokenOpts);
}
