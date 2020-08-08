import * as express from 'express';
import chirpsRoute =  require('../chirpstore');
let router = express.Router();

router.get("/?", (req, res) => {
  let json =  chirpsRoute.GetChirps();
  if(json)
      res.send(json);
});

export default router;