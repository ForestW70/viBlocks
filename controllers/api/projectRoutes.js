const router = require('express').Router();
const { User, Project } = require('../../models');
const withAuth = require('../../utils/auth');


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
        song_title,
            song_description: req.body.song_description,
            song_card_color: req.body.song_card_color,
            drum_kit: req.body.drum_kit,
            drum_sequencer_steps: req.body.drum_sequencer_steps,
            effects_is_on: req.body.effects_is_on,
            reverb_val: req.body.reverb_val,
            distortion_val: req.body.distortion_val,
            delay_val: req.body.delay_val,
            feedback_val: req.body.feedback_val,
            melody_is_on: req.body.melody_is_on,
            melody_sequencer_steps: req.body.melody_sequencer_steps,
            melody_reverb_val: req.body.melody_reverb_val,
            melody_effect_val: req.body.melody_effect_val,
            volume_val: req.body.volume_val,
            compressor_val: req.body.compressor_val,
            bpm_val: req.body.bpm_val,
      });
      res.render('new-project', {newProject, logged_in: true })
    //   res.status(200).json(newProject);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.patch('/:id', withAuth, async (req, res) => {
    try {
      const project = await Project.update({
            song_card_color: req.body.song_card_color,
            drum_kit: req.body.drum_kit,
            drum_sequencer_steps: req.body.drum_sequencer_steps,
            effects_is_on: req.body.effects_is_on,
            reverb_val: req.body.reverb_val,
            distortion_val: req.body.distortion_val,
            delay_val: req.body.delay_val,
            feedback_val: req.body.feedback_val,
            melody_is_on: req.body.melody_is_on,
            melody_sequencer_steps: req.body.melody_sequencer_steps,
            melody_reverb_val: req.body.melody_reverb_val,
            melody_effect_val: req.body.melody_effect_val,
            volume_val: req.body.volume_val,
            compressor_val: req.body.compressor_val,
            bpm_val: req.body.bpm_val,
      });
      res.render('user-dash', {project, logged_in: true })
    //   res.status(200).json(newProject);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
