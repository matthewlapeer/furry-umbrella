const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projectsController');

router.get('/',
  projectsController.getProjects,
  (req, res) => res.status(200).json(res.locals.projects)
);

router.post('/:name',
  projectsController.createProject,
  (req, res) => res.status(200).json('done')
);

router.put('/:id',
  projectsController.updateProject,
  (req, res) => res.status(200).json('done')
);

router.delete('/:id',
  projectsController.deleteProject,
  (req, res) => res.status(200).json('done')
);

module.exports = router;