const dotenv = require('dotenv');
const path = require('path');
const joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVariablesSchema = joi.object().keys({
  NODE_ENV: joi.string().required(),
  PORT: joi.number().default(8080),
  MONGO_CONNECTION_STRING: joi.string().required().description('MONGODB CONNECTION STRING.'),
  SESSION_SECRET: joi.string().required().description('SESSION SECRET'),
}).unknown();

const { value: envVariables, error } = envVariablesSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) { console.error(error); }

module.exports = {
  envoirment: envVariables.NODE_ENV,
  port: envVariables.PORT,
  mongoose: {
    url: envVariables.MONGO_CONNECTION_STRING,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  session: { secret: envVariables.SESSION_SECRET },
};
