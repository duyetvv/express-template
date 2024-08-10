import dev from './dev';
import prod from './prod';

const NODE_ENV = 'development';
const config = NODE_ENV === 'development' ? dev : prod;

export default config;