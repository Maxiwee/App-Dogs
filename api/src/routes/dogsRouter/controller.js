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
        height: d.height.metric,
        ['years of life']: d.life_span,
        temperament: d.temperament,
        image: d.image.url,
      };
      return dog;
    });

    let dogsBd = await Dog.findAll({
      include: [
        {
          model: Temperament,
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
    });

    dogsBd = dogsBd.map(d => {
      let dog = {
        id: d.idDog,
        breed: d.Breed,
        weight: d.Weight,
        height: d.Height,
        ['years of life']: d['Years of life'],
        temperament: d.Temperaments.map(x => x.name).join(', '),
        image: d.Image,
      };
      return dog;
    });

    let allDogs = [...dogsApi, ...dogsBd];

    if (name) {
      const dogsFilter = allDogs.filter(dog =>
        dog.breed.toLowerCase().includes(name.toLowerCase())
      );

      if (!dogsFilter[0])
        throw new Error('The breed you are looking for does not exist');

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
    height,
    weight,
    years,
    getDogs
  ) => {
    if (!breed || !weight || !height || !years)
      throw new Error('Faltan campos sin llenar');

    let idMax = Math.max(...(await getDogs()).map(dog => dog.id));

    Math.max(...(await getDogs()).map(dog => dog.id));

    let breedCorrect =
      breed.charAt(0).toUpperCase() + breed.slice(1).toLowerCase();

    const newDog = await Dog.create({
      idDog: ++idMax,
      Breed: breedCorrect,
      Weight: weight,
      Height: height,
      ['Years of life']: years,
      Image: image,
      // ||
      // 'https://mystickermania.com/cdn/stickers/into_the_web/sticker_2020-512x512.png',
    });

    const temperament = await Temperament.findAll({
      where: { name: temperaments },
    });

    newDog.addTemperament(temperament);

    // const temperament = await Temperament.findAll({
    //   where: {
    //     nombre: temperaments.replace(/ /g, '').split(','),
    //   },
    // });

    // const dog = await Dog.findByPk(newDog.idDog);
    // await dog.addTemperament(temperament);

    //console.log(temperaments.replace(/ /g, '').split(','));

    // 'feliz, guardian'

    // Buscar temperamentos
    // temperaments.replace(/ /g, '').split(',')
    // const temperaments = await Temperament.findAll({
    //   where: { nombre: temperaments.replace(/ /g, '').split(',') },
    // });
    // const temp = await Temperament.findAll({
    //   where: { nombre: ['1', '2'] },
    // });

    return newDog;
  },
};
