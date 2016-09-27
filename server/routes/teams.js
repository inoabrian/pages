module.exports = app => {
  const Teams = app.models.teams;

  app.get('/teams', (req, res) => {
    Teams.list((err, users) => {
      if (err) {
        return res.status(412).json(err);
      }
      sonsole.log('request coming in for teams');
      return res.json(users);
    });
  });

  app.get('/teams/:userId', (req, res) => {
    const { userId } = req.params;
    Teams.get(userId, (err, user) => {
      if (err) {
        return res.status(412).json(err);
      }
      if (user) {
        return res.json(user);
      }
      return res.status(404).end();
    });
  });

  app.post('/teams', (req, res) => {
    const user = req.body;
    Teams.insert(user, (err, newUser) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(newUser);
    });
  });

  app.put('/teams/:userId', (req, res) => {
    const { userId } = req.params;
    const user = req.body;
    Teams.update(userId, user, (err, newUser) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(newUser);
    });
  });

  app.delete('/teams/:userId', (req, res) => {
    const { userId } = req.params;
    Teams.delete(userId, (err) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.status(204).end();
    });
  });
};
