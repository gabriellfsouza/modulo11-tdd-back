require('dotenv').config({
  path: String(process.env.NODE_ENV).trim() === 'test' ? '.env.test' : '.env',
});
