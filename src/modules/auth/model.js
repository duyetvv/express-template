import Model from '../../model';


/**
 * The defined of the user object
 */
export const entity = {
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
  }
}

/**
 * The User model extended from the Model class.
 * The usage: (new User()).init({ username: 'duyetvv', ... })
 */
export default class AuthModel extends Model {
  constructor(data) {
    super(entity);
    
    Object.keys(this.props).forEach((field) => {
      this.props[field].val = data[field];
    });
  }
};





