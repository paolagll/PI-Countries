const { Country, Activity, country_activity } = require("../db");
const { Op } = require("sequelize");


const getActivities = async (id,res) => {
    let find;
    if (id) {
      // Use the `where` option with `findAll` to filter by id
      find = await Activity.findAll({
        where: { id },
        include: [Country], // Include the related Country model
        order: ["id"],
      });
      console.log(`getActivities/id was executed successfully.`);
      return find;
    } else {
      find = await Activity.findAll({
        include: [Country], // Include the related Country model
        order: ["id"],
      });
     
      console.log(`getActivities was executed successfully`);
      return find;
  //   }
  // } catch (error) {
  //   res.status(404).send(error);
  }
};

const getActivityById = async (id) => {
  try {
    // Attempt to retrieve a single result from DB through ID (including countries)
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
    // Error msg in casa data call failed
    console.error('data call failed');
  }
};


module.exports = {
  getActivities,
  getActivityById
}