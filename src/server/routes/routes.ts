import * as express from 'express';
import myChirpRoutes from './chrips';
import allMyChirps from "./allchirps";
let router = express.Router();


router.use('/getall', allMyChirps);
router.use('/api', myChirpRoutes);

export default router;