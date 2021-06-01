const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const { User, Project } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {
    const projectData = await Project.findAll();
    const projects = projectData.map(each => each.get({ plain: true }));

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }


});


router.get('/:id', withAuth, async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }
    const projectData = project.get({ plain: true });

    console.log(projectData);


    res.render('app', { projectData, inApp: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    const projectData = await Project.create({
      username: req.body.username,
      user_id: req.body.user_id,
      song_title: req.body.song_title,
      song_description: req.body.song_description,
    //   song_card_color: req.body.song_card_color,
    //   drum_kit: req.body.drum_kit,
    //   drum_sequencer_steps: req.body.drum_sequencer_steps,
    //   reverb_val: req.body.reverb_val,
    //   distortion_val: req.body.distortion_val,
    //   delay_val: req.body.delay_val,
    //   feedback_val: req.body.feedback_val,
    //   melody_is_on: req.body.melody_is_on,
    //   melody_sequencer_steps: req.body.melody_sequencer_steps,
    //   melody_reverb_val: req.body.melody_reverb_val,
    //   melody_effect_val: req.body.melody_effect_val,
    //   compressor_val: req.body.compressor_val,
    //   bpm_val: req.body.bpm_val,
    });
    res.render('app', { projectData, logged_in: true });
    //   res.status(200).json(newProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const project = await Project.update(
      req.body,
      {
        where: {
          song_id: req.params.id
        }
      });

    res.render('userdash', { project, logged_in: true });
    //   res.status(200).json(newProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
