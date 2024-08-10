import UserModel, { userEntity } from './model';
import { PATH } from './constants';
import Database from '../../database';

const userData = new Database('tbl_user', userEntity);

userData.creating();

const getUser = (req, res) => {
  userData.selectAll().then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err);
  });
};


const getUserById = ({ params: { id } }, res) => {
  userData.selectByClause({
    selectList: '*',
    conditions: `id=+${id}`
  }).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
}


const addUser = ({ body }, res) => {
  const user = new UserModel(body);
  const validRes = user.validate();

  if (!validRes.isValid) {
    res.json(validRes);
    return;
  }

  userData.inserting(body).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
};


const updateUser = ({ body, params: { id } }, res) => {
  const user = new UserModel(body);
  const validRes = user.validate();

  if (!validRes.isValid) {
    res.json(validRes);
    return;
  }
  
  userData.updating(id, body).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
};


const userRoutes = (router) => {
  router.route(PATH.USER).get(getUser).post(addUser);
  router.route(PATH.USER_DETAIL).get(getUserById).put(updateUser);
};

export default userRoutes;
