module.exports = app => {
  const Teams = app.models.teams;

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/teams/search/:searchString', (req, res) => {
    const { searchString } = req.params;
    console.log(searchString);
    Teams.search(searchString, (err, teams) => {
      if(err) {
        return res.status(412).json(err);
      }
      console.log(`Searching for ${searchString}`);
      console.log(teams);
      return res.json(teams);
    })
  });

  app.get('/teams', (req, res) => {
    Teams.list((err, users) => {
      if (err) {
        return res.status(412).json(err);
      }
      console.log('request coming in for teams');
      return res.json(users);
    });
  });

  app.get('/teams/:teamID', (req, res) => {
    const { teamID } = req.params;
    Teams.get(teamID, (err, user) => {
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
