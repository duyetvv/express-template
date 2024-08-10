import AuthModel, { entity } from './model';
import TokenModel, { tokenEntity } from './tokenModel';
import { PATH } from './constants';
import Database from '../../database';
import { generateToken, verifyAccessToken } from '../../helpers/token';

const authData = new Database('tbl_user', entity);
const tokenData = new Database('tbl_token', tokenEntity);

tokenData.creating();

const getTokenFromAuth = (token) => {
  const tokenIdx = token.startsWith('Bearer ') ? 7 : 6;
 
  return token.slice(tokenIdx, token.length);
}

const insertToken = (body) => {
  const token = new TokenModel(body);
  const validRes = token.validate();

  if (!validRes.isValid) {
    res.json(validRes);
    return;
  }

  tokenData.selectByClause({
    selectList: '*',
    conditions: `username='${body.username}' AND client_ip='${body.client_ip}'`
  }).then((data) => {
    !data.length ? tokenData.inserting(body) : tokenData.updating(data[0].id, body);
  });
}

const login = ({ body, clientIp }, res) => {
  const auth = new AuthModel(body);
  const validRes = auth.validate();

  if (!validRes.isValid) {
    res.json(validRes);
    return;
  }

  authData.selectByClause({
    selectList: '*',
    conditions: `username='${body.username}' AND password='${body.password}'`
  }).then((data) => {
    const token = generateToken(data);
    
    insertToken({ ...token, username: body.username, client_ip: clientIp, alive: '1' });
    res.json({ ...data[0], ...token });
  }).catch((err) => {
    res.json(err);
  });
}


const getSelf = ({ headers : { authorization } }, res) => {
  const token = getTokenFromAuth(authorization);
  const verified = verifyAccessToken(token);
  res.json({ token, verified })
} 

const authRoutes = (router) => {
  router.route(PATH.LOGIN).post(login);
  router.route(PATH.SELF).get(getSelf);
};


export default authRoutes;
