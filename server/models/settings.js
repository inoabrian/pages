import r from 'rethinkdb';
import val from 'lx-valid';
import config from '../config.js';

module.exports = () => {
  const Settings = {
    tableName: 'user_settings',
    fields: {
      properties: {
        userId: {
          type: 'string'
        },
        user: {
            type: 'string'
        },
        theme_color: {
            type: 'string'
        }
      }
    },
    validate(data, isUpdate = false) {
      const { schema } = config.model;
      schema.isUpdate = isUpdate;
      const validate = val.getValidationFunction();
      return validate(data, this.fields, schema);
    },
    list(done) {
      r.connect(config.rethinkdb)
        .then(conn => {
          r.table(this.tableName)
            .run(conn)
            .then(cursor => {
              cursor.toArray()
                .then(settings => done(null, settings))
                .error(err => done(err))
              ;
            })
            .error(err => done(err))
          ;
        });
    },
    get(userId, done) {
      r.connect(config.rethinkdb)
        .then(conn => {
          r.table(this.tableName)
            .get(userId)
            .run(conn)
            .then(setting => done(null, setting))
            .error(err => done(err))
          ;
        })
      ;
    },
    insert(setting, done) {
      const validation = this.validate(setting, false);
      if (validation.valid) {
        r.connect(config.rethinkdb)
          .then(conn => {
            r.table(this.tableName)
              .insert(setting)
              .run(conn)
              .then(result => {
                r.table(this.tableName)
                  .get(result.generated_keys[0])
                  .run(conn)
                  .then(newSettings => done(null, newSettings))
                  .error(err => done(err))
                ;
              })
              .error(err => done(err))
            ;
          })
        ;
      } else {
        done(validation.errors);
      }
    },
    update(userId, setting, done) {
      const validation = this.validate(setting, true);
      if (validation.valid) {
        r.connect(config.rethinkdb)
          .then(conn => {
            r.table(this.tableName)
              .get(userId)
              .update(setting, config.model.update)
              .run(conn)
              .then(result => {
                const { new_val } = result.changes[0] || {};
                done(null, new_val);
              })
              .error(err => done(err))
            ;
          })
        ;
      } else {
        done(validation.errors);
      }
    },
    delete(userId, done) {
      r.connect(config.rethinkdb)
        .then(conn => {
          r.table(this.tableName)
            .get(userId)
            .delete()
            .run(conn)
            .then(() => done(null))
            .error(err => done(err))
          ;
        })
      ;
    }
  };
  return Settings;
};
