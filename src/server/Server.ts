/* eslint-disable linebreak-style */
import express from 'express';


import {router} from './routes';

const server = express(); 


server.use(express.json());

server.use(router);

export {server} ;