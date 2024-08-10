import { ERRORCODE } from './errorcode';
import { email, number } from './regex';

/**
 * The list of the validation rules.
 * It will be define dependen on project
 */
const validateRules = {
  required: {
    test: ({ val }) => !!val && val.length > 0,
    res: ({ name, arg }) => ({ arg, name, code: ERRORCODE.required })
  },
  dataType: {
    test: ({ val, arg }) => (typeof val.trim() === arg),
    res: ({ name, arg }) => ({ arg, name, code: ERRORCODE.dataType })
  },
  maxLength: {
    test: ({ val, arg }) => !val || (val.length <= arg),
    res: ({ name, arg }) => ({ arg, name, code: ERRORCODE.maxLength })
  },
  minLength: {
    test: ({ val, arg }) => !val || (val.length >= arg),
    res: ({ name, arg }) => ({ arg, name, code: ERRORCODE.minLength })
  },
  email: {
    test: ({ val }) => !val || email.test(val),
    res: ({ name, arg }) => ({ arg, name, code: ERRORCODE.email })
  },
  number: {
    test: ({ val }) => !val || number.test(val),
    res: ({ name, arg }) => ({ arg, name, code: ERRORCODE.number })
  },
  phone: {
    test: ({ val }) => !val || number.test(val),
    res: ({ name, arg }) => ({ arg, name, code: ERRORCODE.phone })
  },
};

/**
 * The validate function
 */
export default (type) => (
  (val, name, arg = null) => ({
    isValid: validateRules[type].test({ val, name, arg }),
    res: validateRules[type].res({ name, arg }),
  })
);