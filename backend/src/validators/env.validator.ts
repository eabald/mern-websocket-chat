import { cleanEnv, str, port } from 'envalid';
const EnvValidator = (env: object) : void => {
  cleanEnv(env, {
    MONGO_URI: str(),
    BACKEND_PORT: port(),
  });
};

export default EnvValidator;
