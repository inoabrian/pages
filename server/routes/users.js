module.exports = app => {
  const Users = app.models.user;

  app.get('/users', (req, res) => {
    Users.list((err, users) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(users);
    });
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    Users.get(userId, (err, user) => {
      if (err) {
        return res.status(412).json(err);
      }
      if (user) {
        return res.json(user);
      }
      return res.status(404).end();
    });
  });

  app.post('/users', (req, res) => {
    const user = req.body;
    Users.insert(user, (err, newUser) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(newUser);
    });
  });

  app.put('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const user = req.body;
    Users.update(userId, user, (err, newUser) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(newUser);
    });
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    Users.delete(userId, (err) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.status(204).end();
    });
  });
};
