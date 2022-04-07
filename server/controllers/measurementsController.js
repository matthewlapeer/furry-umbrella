const db = require('../models/drafts');

const measurementsController = {}; 

measurementsController.getMeasurements = (req, res, next) => {
  const { id } = req.params;
  
  const statement = 'SELECT * FROM measurements INNER JOIN measurement_detail ON measurements._id = measurement_detail.measurement_id WHERE measurement_detail.project_id = $1;';

  db.query(statement, [id])
    .then(data => {
      res.locals.measurements = data.rows;
      return next();
    })
    .catch(error => {
      return next({
        log: `measurementsController.getMeasurement, ERROR: ${error}`,
        message: {err: 'unable to retreive projects'},
      });
    })
}

measurementsController.createMeasurement = (req, res, next) => {
  const { id } = req.params;
  const { name, value, unit } = req.body;

  console.log(req.body);

  const statement = `WITH new_measurement 
  AS (INSERT INTO measurements(name, value, unit) VALUES ($1, $2, $3) RETURNING _id) 
  INSERT INTO measurement_detail VALUES ($4, (SELECT _id FROM new_measurement));`;

  db.query(statement, [name, value, unit, id])
    .then(data => {
      console.log(data);
      return next();
    })
    .catch(error => {
      return next({
        log: `measurementsController.createMeasurement, ERROR: ${error}`,
        message: {err: 'unable to create measurement'},
      });
    })
}

measurementsController.updateMeasurement = (req, res, next) => {
  const { id } = req.params;
  const { name, value, unit } = req.body;
  
  if (!id || !name) {
    return next({
      log: `measurementsController.updateMeasurement, request information missing`,
      message: {err: 'unable to update measurement'},
    })
  }
  
  const statement = 'UPDATE measurements SET name = $2, value = $3, unit = $4 WHERE _id = $1';

  db.query(statement, [id, name, value, unit])
    .then(data => {
      if (data.rowCount === 0) {throw new Error('database update failed')}
      return next();
    })
    .catch(error => {
      return next({
        log: `measurementsController.updateMeasurement, ERROR: ${error}`,
        message: {err: 'unable to update measurement'},
      });
    })
}

measurementsController.deleteMeasurement = (req, res, next) => {
  const { id } = req.params;
  
  const statement = 'DELETE FROM measurements WHERE _id = $1';

  db.query(statement, [id])
    .then(data => {
      if (data.rowCount === 0) {throw new Error('database entry deletion failed')}
      return next();
    })
    .catch(error => {
      return next({
        log: `measurementsController.deleteMeasurement, ERROR: ${error}`,
        message: {err: 'unable to delete measurement'},
      });
    })
}
module.exports = measurementsController;