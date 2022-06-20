const { Router } = require('express');
const router = Router();
const { getTemperaments } = require('./controller.js');

router.get('/', async (req, res) => {
  const temperaments = await getTemperaments();

  res.send(temperaments);
});

module.exports = router;
