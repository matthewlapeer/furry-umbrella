const db = require('../models/drafts');

const projectsController = {}; 

projectsController.getProjects = (req, res, next) => {
  const statement = 'SELECT * FROM projects';

  db.query(statement)
    .then(data => {
      res.locals.projects = data.rows;
      // console.log('db response:',res.locals.projects);
      return next();
    })
    .catch(error => {
      return next({
        log: `projectsController.getProjects, ERROR: ${error}`,
        message: {err: 'unable to retreive projects'},
      });
    })
}

projectsController.createProject = (req, res, next) => {
  const { name } = req.params;
  console.log(name);

  const statement = 'INSERT INTO projects(name) VALUES ($1)';

  db.query(statement, [name])
    .then(data => {
      console.log(data);
      return next();
    })
    .catch(error => {
      return next({
        log: `projectsController.createProject, ERROR: ${error}`,
        message: {err: 'unable to create project'},
      });
    })
}

projectsController.updateProject = (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  
  if (!id || !name) {
    return next({
      log: `projectsController.updateProject, request information missing`,
      message: {err: 'unable to update project'},
    })
  }
  
  const statement = 'UPDATE projects SET name = $1 WHERE _id = $2';

  db.query(statement, [name, id])
    .then(data => {
      if (data.rowCount === 0) {throw new Error('database update failed')}
      return next();
    })
    .catch(error => {
      return next({
        log: `projectsController.updateProject, ERROR: ${error}`,
        message: {err: 'unable to update project'},
      });
    })
}

projectsController.deleteProject = (req, res, next) => {
  const { id } = req.params;
  
  const statement = 'DELETE FROM projects WHERE _id = $1';

  db.query(statement, [id])
    .then(data => {
      if (data.rowCount === 0) {throw new Error('database entry deletion failed')}
      return next();
    })
    .catch(error => {
      return next({
        log: `projectsController.deleteProject, ERROR: ${error}`,
        message: {err: 'unable to delet project'},
      });
    })
}
module.exports = projectsController;