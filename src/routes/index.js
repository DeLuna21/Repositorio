const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {
   const data ={
    "name": "Nombre",
    "website": "Si"
   };
   res.json(data);
});

module.exports = router;