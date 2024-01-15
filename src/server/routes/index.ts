/* eslint-disable linebreak-style */
import { Router } from 'express';


// import {StatusCodes} from 'http-status-codes';


import {UsersCrontroller} from './../controller';
const router = Router();


router.get('/', (_, res)=>{
    return res.send('supimpa!');

});

// router.post('/teste', (req: Request, res: Response) => {
//     return res.send('Create!');

// });


router.post('/user', UsersCrontroller.create);

export {router};