import * as express from 'express';
import chirpsRoute =  require('../chirpstore');
let router = express.Router();


router.get("/:id/admin?", (req, res) => {
    let id = req.params.id;
    if (id) res.json(chirpsRoute.GetChirp(id));
});

router.post("/add", (req, res) => {
    chirpsRoute.CreateChirp(req.body);
    res.sendStatus(200);
});

router.delete("/:id/admin", (req, res) => {
    let id = req.params.id;
    chirpsRoute.DeleteChirp(id);
    res.sendStatus(200);
});
router.put("/:id/admin", (req, res) => {
    let id = req.params.id;
    chirpsRoute.UpdateChirp(id, req.body);
    res.sendStatus(200);
});

export default router;