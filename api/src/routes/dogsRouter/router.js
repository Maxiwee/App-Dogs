const { Router, application } = require('express');
const router = Router();
const { getDogs, detailDog, createDog } = require('./controller.js');

//Obtener un listado de las razas de perro
//Debe devolver solo los datos necesarios para la ruta principal

// let dogs;
// axios.get('https://api.thedogapi.com/v1/breeds').then(function (response) {
//   dogs = response.data;
// });

router.get('/', async (req, res) => {
  const { name } = req.query;

  try {
    const dogs = await getDogs(name);
    res.status(200).json(dogs);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/:raza', async (req, res) => {
  let { raza } = req.params;
  try {
    const dog = await detailDog(raza);
    res.json(dog);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { nombre, peso, altura, años } = req.body;

  try {
    res.json(await createDog(nombre, peso, altura, años, getDogs));
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
