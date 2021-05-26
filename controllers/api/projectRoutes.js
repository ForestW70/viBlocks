const router = require('express').Router();
const { User, Project } = require('../../models');

router.get('/', withAuth, async (req, res) => {
    try{
        const projectData = await Project.findAll();
        const projects = projectData.map(each => each.get({ plain: true }));

        res.status(200).json(projects);
    }catch(err){
        res.status(500).json(err);
    }
    
    
  });


router.get('/:id', withAuth, async (req, res) => {
    try {
      const projectData = await Project.findOne({
        where: {
          id: req.params.id
        },
      });
  
      if (!projectData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }

      res.status(200).json(projectData);
      res.render('project', { 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.post('/', withAuth, async (req, res) => {
    try {
      const newProject = await Project.create({
        name: req.body.name,
        notes: req.body.notes,
        melody: req.body.melody,
        kits: req.body.kits,
        reverb: req.body.reverb,
        distortion: req.body.distortion,
        pingDelay: req.body.pingDelay,
        pingFeedback: req.body.pingFeedback,
        user_id: req.session.user_id
      });
      res.status(200).json(newProject);
    } catch (err) {
      res.status(500).json(err);
    }
});