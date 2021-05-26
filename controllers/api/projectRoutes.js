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
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!projectData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }

      //10100000-10100000-10100000-10100000-10100000-10100000   ?      10100000-1010000010100000-10100000-10100000-10100000-10100000-10100000

      let arrDrums = JSON.parse(projectData.content.split("?")[0]);
      let arrMel = JSON.parse(projectData.content.split("?")[1]);

      res.status(200).json(projectData);
      res.render('project', { 
        arrDrums, 
        arrMel,
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
        user_id: req.session.user_id
      });
      res.status(200).json(newProject);
    } catch (err) {
      res.status(500).json(err);
    }
});