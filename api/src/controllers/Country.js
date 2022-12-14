const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");


const getCountries = async (req,res) => {
    //Solicito a la API
    const response = await axios.get("https://restcountries.com/v3/all");
    const countries = response.data;

    //Mapeo la data de countries a un array
    const arreglo = [];
      for(let c of countries){
        const createdCountry = await Country.create(
         { id: c.cca3,
          name: c.name.common,
          flag: c.flags[1] || "Image not found",
          continent: c.continents[0],
          capital: c.capital ? c.capital[0] : c.name.common,
          subregion: c.subregion || c.region,
          area: c.area,
          population: c.population
        }
      );
      arreglo.push(createdCountry);
    }
    return arreglo;
};


const findCountries = async (name,res) => {

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
};

const getCountryById = async (id,res) => {
  try {
    return await Country.findByPk(id, { include: [Activity]});
  } catch (error) {
    console.log(`error controller ${error}`);
  }
};


module.exports = {
  getCountries,
  findCountries,
  getCountryById
};