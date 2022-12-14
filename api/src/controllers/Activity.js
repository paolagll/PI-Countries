const { Country, Activity, country_activity } = require("../db");
const { Op } = require("sequelize");


const getActivities = async (id,res) => {
    let find;
    if (id) {
      // filtro por ID
      find = await Activity.findAll({
        where: { id },
        include: [Country],
        order: ["id"],
      });
      console.log(`getActivities/id was executed successfully.`);
      return find;
    } else {
      find = await Activity.findAll({
        include: [Country],
        order: ["id"],
      });
     
      console.log(`getActivities was executed successfully`);
      return find;
  }
};

const getActivityById = async (id) => {
  try {
    return await Activity.findByPk(id, {
      include: {
        model: Country,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (e) {
    console.error('data call failed');
  }
};


module.exports = {
  getActivities,
  getActivityById
}