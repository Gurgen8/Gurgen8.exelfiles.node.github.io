import express from "express";

import excel from "./excel";

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    status: 'ok'
  });
});


router.use('/excel', excel)
export default router;





// post /check-passport  ---> token
// get /candidates-list  ---> [poxos, petros]
// post /vote (11) -->  token ->
