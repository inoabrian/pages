import r from 'rethinkdb';
import val from 'lx-valid';
import config from '../config.js';

module.exports = () => {
  const Users = {
    tableName: 'users',
    fields: {
      properties: {
        id: {
          type: 'string'
        },
        userName: {
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
                .then(users => done(null, users))
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
            .then(user => done(null, user))
            .error(err => done(err))
          ;
        })
      ;
    },
    insert(user, done) {
      const validation = this.validate(user, false);
      if (validation.valid) {
        r.connect(config.rethinkdb)
          .then(conn => {
            r.table(this.tableName)
              .insert(user)
              .run(conn)
              .then(result => {
                r.table(this.tableName)
                  .get(result.generated_keys[0])
                  .run(conn)
                  .then(newUser => done(null, newUser))
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
    update(userId, user, done) {
      const validation = this.validate(user, true);
      if (validation.valid) {
        r.connect(config.rethinkdb)
          .then(conn => {
            r.table(this.tableName)
              .get(userId)
              .update(user, config.model.update)
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
  return Users;
};
