export default {
  isTest: true,
  server: {
    port: 3000,
    host: 'localhost'
  },
  bodyParser: {
    extended: true
  },
  rethinkdb: {
    db: 'pages_db',
    host: 'localhost',
    port: 28015
  },
  consign: {
    verbose: false
  },
  model: {
    schema: {
      unknownProperties: 'delete'
    },
    update: {
      returnChanges: true
    }
  }
};
