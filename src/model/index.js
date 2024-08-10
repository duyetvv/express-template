
import validate from '../validation';

/**
 * The abtract class to define the Model.
 * Which whose the common behavior of 1 model entity 
 */
export default class Model {
  constructor(props) {
    this.props = props;
  }

  /**
   * initialize data for model. The data was recieve from client
   */
  init = (data) => {
    Object.keys(this.props).forEach((key) => {
      this.props[key].val = data[key] || this.props[key].defVal;
    });

    return this.props;
  }

  /**
   * validate the model is passed the validate rules
   */
  validate = () => {
    const objKeys = Object.keys(this.props);
    const results = [];
    objKeys.forEach((field) => {
      const { isValid, errors } = this.validateField(field);
      
      !isValid && results.push({ field, errors });
    });

    return {
      isValid: !results.length,
      errors: results,
      data: this.props,
    };
  }

  /**
   * validate one field of model
   */
  validateField = (field) => {
    const { validations, val } = this.props[field];
    const validateTypes = Object.keys(validations);
    const errors = [];

    validateTypes.forEach((type) => {
      const { isValid, res } = validate(type)(val, field, validations[type]);

      !isValid && errors.push(res);
    });

    return { isValid: !errors.length, errors };
  }
}