const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Temperament } = require('../../db.js');

module.exports = {
  getTemperaments: async () => {
    let dogsApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    );

    let temperaments = dogsApi.data.map(t => t.temperament);

    let temperamentsNotRepeat = [
      ...new Set(temperaments.join(',').replace(/ /g, '').split(',')),
    ].filter(t => t !== '');

    for (let i = 0; i < temperamentsNotRepeat.length; i++) {
      await Temperament.create({ nombre: temperamentsNotRepeat[i] });
    }

    return Temperament.findAll();
  },
};

