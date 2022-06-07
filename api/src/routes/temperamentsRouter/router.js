const { Router } = require('express');
const router = Router();
const { getTemperaments } = require('./controller.js');

router.post('/', async (req, res) => {
  const temperaments = await getTemperaments();

  res.send(temperaments);
});

module.exports = router;
