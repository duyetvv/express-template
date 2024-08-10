import Model from '../../model';


/**
 * The defined of the user object
 */
export const userEntity = {
  username: {
    dataType: 'char(80)',
    nullStr: 'not null',
    defVal: null,
    validations: {
      required: true,
    },
    more: 'unique'
  },
  password: {
    dataType: 'char(41)',
    nullStr: 'not null',
    defVal: null,
    validations: {
      required: true,
    }
  },
  email: {
    dataType: 'char(255)',
    nullStr: 'null',
    defVal: null,
    validations: {
      required: true,
      email: true,
    },
    more: 'default null'
  },
  phone: {
    dataType: 'char(20)',
    nullStr: 'not null',
    defVal: null,
    validations: {
      required: true,
      phone: true,
    }
  },
  address: {
    dataType: 'varchar(255)',
    nullStr: 'not null',
    defVal: null,
    validations: {
      required: true,
    }
  },
  numberOrders: {
    dataType: 'char(20)',
    nullStr: 'null',
    defVal: null,
    validations: {
      required: true,
      number: true,
    },
    more: 'default null',
  }
}

/**
 * The User model extended from the Model class.
 * The usage: (new User()).init({ username: 'duyetvv', ... })
 */
export default class UserModel extends Model {
  constructor(data) {
    super(userEntity);
    
    Object.keys(this.props).forEach((field) => {
      this.props[field].val = data[field];
    });
  }
};


