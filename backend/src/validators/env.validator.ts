import { cleanEnv, str, port } from 'envalid';
const EnvValidator = (env: object) : void => {
  cleanEnv(env, {
    MONGO_URI: str(),
    PORT: port(),
    JWT_SECRET: str(),
    REDIS_PORT: str(),
    REDIS_HOST: str(),
    REDIS_PASSWORD: str(),
  });
};

export default EnvValidator;
