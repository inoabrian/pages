module.exports = app => {
  const Settings = app.models.settings;

  app.get('/settings', (req, res) => {
    Settings.list((err, settings) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(settings);
    });
  });

  app.get('/settings/:userId', (req, res) => {
    const { userId } = req.params;
    Settings.get(userId, (err, settings) => {
      if (err) {
        return res.status(412).json(err);
      }
      if (settings) {
        return res.json(settings);
      }
      return res.status(404).end();
    });
  });

  app.post('/settings', (req, res) => {
    const setting = req.body;
    Settings.insert(setting, (err, newSettings) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(newSettings);
    });
  });

  app.put('/settings/:userId', (req, res) => {
    const { userId } = req.params;
    const setting = req.body;
    Settings.update(userId, setting, (err, newSetting) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(newSetting);
    });
  });

  app.delete('/settings/:userId', (req, res) => {
    const { userId } = req.params;
    Settings.delete(userId, (err) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.status(204).end();
    });
  });
};
