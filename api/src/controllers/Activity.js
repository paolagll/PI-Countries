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

const addActivity = async (content) => {
  try {
    const { name, difficulty, duration, season, countries } = content;
    // Create new activity
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
      countries,
    });
    //   Link activity to its countries
    await newActivity.addCountry(countries);

    console.log(`Activity successfully added to database`);
    return await Activity.findByPk(newActivity.id, {
      include: { model: Country, attributes: ["id"] },
    });
  } catch (e) {
    // Error msg in case data insertion failed
    console.log(`Error al crear${e}`);
  }
};

const updateActivity = async (id, content) => {
  try {
    const { name, difficulty, duration, season, countries } = content;
    const activity = await Activity.findByPk(id);

    // update fields gotten by content
    if (name) activity.name = name;
    if (difficulty) activity.difficulty = difficulty;
    if (duration) activity.duration = duration;
    if (season) activity.season = season;
    if (countries) activity.countries= countries;

    // save changes on row and return updated activity
    await activity.save();

    return activity;
  } catch (e) {
    console.log(`error al cambiar${e}`);
  }
};

// delete activities
const deleteActivity = async (id) => {
  try {
    const activity = await Activity.destroy({ where: { id } });
    // Destroy returns an integer (amount of rows destroyed)
    if (activity > 0) {
      console.log(`Activity (id: ${id}) deleted successfully`);
    } else console.error(`Activity does not exist`);
  } catch (e) {
    // Error msg in case row delete failed
    console.error(`${ERROR}deleteActivity --> ${e}`);
  }
};

module.exports = {
  getActivities,
  getActivityById,
  addActivity,
  updateActivity,
  deleteActivity,
}