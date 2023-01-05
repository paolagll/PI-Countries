const { Router } = require('express');
const router = Router();
const {
    getActivities,
    getActivityById,
    addActivity,
    updateActivity,
    deleteActivity,
} = require("../controllers/Activity");


router.get("/", async (req, res) => {
    try {
      const { id } = req.params;
      // AGREGAR ID
      const find = await getActivities(id);
      find.length
        ? res.json(find)
        : console.error(`No activities were created yet!`);
    } catch (e) {
      res.status(404).send(`Error --> ${e}`); // Not found
    }
});

router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedActivity = await getActivities(id, req.body);
      res.send(updatedActivity);
    } catch (e) {
      res.status(404).send(`Error --> ${e}`); // Not found
    }
});
 
router.post("/", async (req, res) => {
    
    try {
      const { name, difficulty, duration, season } = req.body;
      console.log(name, difficulty, duration, season );
      const newActivity = await addActivity(req.body);
      res.status(201).send(newActivity);
    } catch (e) {
      res.status(400).send(`Error --> ${e}`); // Bad request
    }
});
  
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedActivity = await updateActivity(id, req.body);
      res.send(updatedActivity);
    } catch (e) {
      res.status(404).send(`Error --> ${e}`); // Not found
    }
});
  

router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await deleteActivity(id);
      res.send(`Activity deleted successfully`);
    } catch (e) {
      res.status(400).send(`Error --> ${e}`); // Bad request
    }
});

module.exports = router