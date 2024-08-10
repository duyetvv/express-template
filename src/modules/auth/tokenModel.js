import Model from '../../model';

export const tokenEntity = {
  username: {
    dataType: 'char(80)',
    nullStr: 'not null',
    defVal: null,
    validations: {
      required: true,
    },
  },
  client_ip: {
    dataType: 'char(255)',
    nullStr: 'not null',
    defVal: null,
    validations: {
      required: true,
    }
  },
  refresh_token: {
    dataType: 'varchar(2000)',
    nullStr: 'not null',
    defVal: null,
    validations: {
      required: true,
    }
  },
  access_token: {
    dataType: 'varchar(2000)',
    nullStr: 'not null',
    defVal: null,
    validations: {
      required: true,
    }
  },
  alive: {
    dataType: 'int',
    nullStr: 'not null',
    defVal: 1,
    validations: {
      required: true,
    }
  }
}


export default class TokenModel extends Model {
  constructor(data) {
    super(tokenEntity);

    Object.keys(this.props).forEach((field) => {
      this.props[field].val = data[field];
    });
  }
};
