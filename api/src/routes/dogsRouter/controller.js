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
        breed: d.name,
        weight: d.weight.metric,
        hight: d.height.metric,
        ['years of life']: d.life_span,
        temperament: d.temperament,
        image: d.image.url,
      };
      return dog;
    });

    let dogsBd = await Dog.findAll();

    dogsBd = dogsBd.map(d => {
      let dog = {
        id: d.idDog,
        breed: d.Breed,
        weight: d.Weight,
        hight: d.Hight,
        ['years of life']: d['Years of life'],
        temperament: 'TEMP',
        image: d.Image,
      };
      return dog;
    });

    let allDogs = [...dogsApi, ...dogsBd];

    if (name) {
      const dogsFilter = allDogs.filter(dog =>
        dog.breed.toLowerCase().includes(name.toLowerCase())
      );

      if (!dogsFilter[0]) throw new Error('No existe la raza');

      return dogsFilter;
    }

    return allDogs;
  },

  detailDog: async (id, getDogs) => {
    const dogsFound = (await getDogs()).find(dog => dog.id == id);

    if (!dogsFound) throw new Error('Dog not found');

    return dogsFound;
  },

  createDog: async (
    image,
    breed,
    temperaments,
    hight,
    weight,
    years,
    getDogs
  ) => {
    if (!breed || !weight || !hight || !years)
      throw new Error('Faltan campos sin llenar');

    let idMax = Math.max(...(await getDogs()).map(dog => dog.id));
    let breedCorrect = breed.charAt(0).toUpperCase() + breed.slice(1);

    const newDog = await Dog.create({
      idDog: ++idMax,
      Breed: breedCorrect,
      Weight: weight,
      Hight: hight,
      ['Years of life']: years,
      Image:
        image ||
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCYhhbdCPKaRgDx_ROZXhvT1bWoLrEN4EBtA&usqp=CAU',
    });

    // Buscar temperamentos

    // const temp = await Temperament.findAll({
    //   where: { nombre: ['1', '2'] },
    // });

    // newDog.addTemperamento(temp);

    return newDog;
  },
};
