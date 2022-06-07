const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Dog, Temperament } = require('../../db.js');

module.exports = {
  getDogs: async name => {
    let dogsApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    );

    dogsApi = dogsApi.data.map(d => {
      let dog = {
        id: d.id,
        nombre: d.name,
        peso: d.weight.metric,
        altura: d.height.metric,
        ['años de vida']: d.life_span,
        temperamento: d.temperament,
        imagen: d.image.url,
      };
      return dog;
    });

    let dogsBd = await Dog.findAll();

    dogsBd = dogsBd.map(d => {
      let dog = {
        id: d.idDog,
        nombre: d.Nombre,
        peso: d.Peso,
        altura: d.Altura,
        ['años de vida']: d.Anios_de_vida,
        temperamento: 'TEMP',
        imagen: 'IMG',
      };
      return dog;
    });

    let allDogs = [...dogsApi, ...dogsBd];

    if (name) {
      const dogsFilter = allDogs.filter(dog =>
        dog.nombre.toLowerCase().includes(name.toLowerCase())
      );

      if (!dogsFilter[0]) throw new Error('No existe la raza');

      return dogsFilter;
    }

    return allDogs;
  },

  detailDog: async raza => {
    const dog = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${raza}&api_key=${YOUR_API_KEY}`
    );

    if (!dog.data.length) throw new Error('No existe la raza');

    return dog.data;
  },

  createDog: async (nombre, peso, altura, añosDeVida, getDogs) => {
    if (!nombre || !peso || !altura || !añosDeVida)
      throw new Error('Faltan campos sin llenar');

    let idMax = Math.max(...(await getDogs()).map(dog => dog.id));

    const newDog = await Dog.create({
      idDog: ++idMax,
      Nombre: nombre,
      Peso: peso,
      Altura: altura,
      Anios_de_vida: añosDeVida,
    });

    return newDog;
  },
};
