const router = require('express').Router();
const { request } = require('express');
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/gimme', (req, res) => {
  Project.findAll().then((projData) => {
    res.json(projData);
  });
});

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await Project.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    // const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      userData,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/user-dash', withAuth, async (req, res) => {
  try {

    const userData = await Project.find({
      where: { user_id: req.session.user_id },
      include: [User]
    });

    const userProjects = userData.map(project => project.get({ plain: true }));

    res.render('homepage', { userProjects });
  } catch (err) {
    res.status(500).json(err);
  }
})



module.exports = router;
