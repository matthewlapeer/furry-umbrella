const express = require('express');
const router = express.Router();

const measurementsController = require('../controllers/measurementsController');

router.get('/:id',
measurementsController.getMeasurements,
  (req, res) => res.status(200).json(res.locals.measurements)
);

router.post('/:id',
  measurementsController.createMeasurement,
  (req, res) => res.status(200).json('done')
);

// router.put('/:id',
//   projectsController.updateProject,
//   (req, res) => res.status(200).json('done')
// );

// router.delete('/:id',
//   projectsController.deleteProject,
//   (req, res) => res.status(200).json('done')
// );

module.exports = router;