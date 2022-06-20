const { Router, application } = require('express');
const router = Router();
const { getDogs, detailDog, createDog } = require('./controller.js');

router.get('/', async (req, res) => {
  const { name } = req.query;

  try {
    const dogs = await getDogs(name);
    res.status(200).json(dogs);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  let { id } = req.params;
  try {
    const dog = await detailDog(id, getDogs);
    res.json(dog);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { image, breed, temperaments, height, weight, years } = req.body;

  try {
    res.json(
      await createDog(image, breed, temperaments, height, weight, years, getDogs)
    );
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
