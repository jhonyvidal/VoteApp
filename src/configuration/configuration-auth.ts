import { registerAs } from '@nestjs/config';

export default registerAs('auth',()=>({
    secretKey: process.env._SECRETKEY_AUTH
}));

