const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

const PATH = "https://restcountries.com/v3/";

const getCountries = async () => {
  try {
    //Solicito a la API
    const response = await axios.get(`${PATH}all`);
    const countries = response.data;

    //Mapeo la data de countries a un array de country objects
    
    const countryObjects = countries.map(c => ({
      id: c.cca3,
      name: c.name.common,
      flag: c.flags[1] || "Image not found",
      continent: c.continents[0],
      capital: c.capital ? c.capital[0] : c.name.common,
      subregion: c.subregion || c.region,
      area: c.area,
      population: c.population
    }));

    // Encuentro o creo la country en la bd
    const createdCountries = await Country.findOrCreate(countryObjects);

    // Retorno los paises creados
    return res.status(200).send(createdCountries);
  } catch (error) {
    // Retorno error
    return res.status(404).send(error);
  }
};


const findCountries = async (name) => {
  try {
    // Defino las opciones de la query dado el name
    let options = {
      include: {
        model: Activity,
        attributes: ["name"],
        through: {
          attributes: []
        }
      }
    };
    if (name) {
      options = {
        where: { name: { [Op.iLike]: `%${name}%` } },
        ...options
      };
    }

    const countries = await Country.findAll(options);

    // solicito solo la info que requiero y la retorno

    const formattedCountries = countries.map(c => ({
      id: c.id,
      name: c.name,
      continent: c.continent,
      flag: c.flag,
      population: c.population,
      activities: c.activities
    }));
    return formattedCountries;

  } catch (error) {
    return res.status(404).send(error);
  }
};

const getCountryById = async (req, res) => {
    const { id } = req.params;

};