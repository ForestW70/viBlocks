const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');


// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/user-dash');
    return;
  }


  try {
    const userData = await User.findAll().catch(err => {
      res.json(err);
    });

    // eslint-disable-next-line no-unused-vars
    const users = userData.map((project) => project.get({ plain: true }));

    res.redirect('/user-dash');
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/user-dash');
    return;
  }

  res.render('login');
});



router.get('/user-dash', withAuth, async (req, res) => {
  try {
    const userData = await Project.findAll({
      include: [
        {
          model: User,
          where: {
            user_id: req.session.user_id,
          }
        }],
    });

    const userProjects = userData.map(project => project.get({ plain: true }));

    res.render('userdash', { userProjects, username: req.session.username, user_id:req.session.user_id} );
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/app', async (req, res) => {
  try {
    res.render('app');
  } catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;
