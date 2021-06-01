const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const { User, Projects } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
      return;
    }


    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
      return;
    });

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(200).json(userData);
      // res.render('userdash', { username: req.session.username, user_id:req.session.user_id});
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


router.get('/:username', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.params.username,
      },
      attributes: {
        exclude: ['password']
      }
    });

    if (!userData) {
      res
        .status(404)
        .json({ message: 'Not found' });
      return;
    }
    res
      .status(200)
      .json({ userData});
    return;
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  const userData = await User.findAll();
  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(500);
  }
});

module.exports = router;
