import r from 'rethinkdb';
import val from 'lx-valid';
import config from '../config.js';

module.exports = () => {
  const Teams = {
    tableName: 'teams',
    fields: {
      properties: {
        createdDate: {
          type: 'date'
        },
        id: {
            type: 'string'
        },
        teamActive: {
            type: 'boolean'
        },
        teamBackgroundImage: {
            type: 'string'
        },
        teamMembers: {
            type: 'any'
        },
        teamName: {
            type: 'string'
        },
        teamProjects: {
            type: 'any'
        },
        teamTechStack: {
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
            .filter(team => {
              return team('teamActive').eq(true)
            })
            .run(conn)
            .then(cursor => {
                cursor.toArray()
                .then(teams => done(null, teams))
                .error(err => done(err))
              ;
            })
            .error(err => done(err))
          ;
        });
    },
    search(filterString, done){
      r.connect(config.rethinkdb)
        .then(conn => {
          r.table(this.tableName)
            // .filter(team => {
            //   return team('teamName').downcase().match(filterString)
            //         .or(team('teamTechStack').contains(function(stack){
            //           return stack.downcase().match(filterString)
            //         }))
            // })
            .filter(team => {
              return team('teamName').downcase().match('r')
                      .or(
                        team('teamTechStack').contains(function(stack){
                              return stack("tech").downcase().match('r');
                        })
                      )
            })
            .run(conn)
            .then(teams => {
              teams.toArray()
              .then(teams => done(null, teams))
              .error(err => done(err))
            })
            .error(err => done(err))
            ;
        })
        .error(err => done(err))
        ;
    },
    get(teamId, done) {
      r.connect(config.rethinkdb)
        .then(conn => {
          r.table(this.tableName)
            .get(teamId)
            .run(conn)
            .then(team => done(null, team))
            .error(err => done(err))
          ;
        })
      ;
    },
    insert(team, done) {
      const validation = this.validate(team, false);
      if (validation.valid) {
        r.connect(config.rethinkdb)
          .then(conn => {
            r.table(this.tableName)
              .insert(team)
              .run(conn)
              .then(result => {
                r.table(this.tableName)
                  .get(result.generated_keys[0])
                  .run(conn)
                  .then(newTeam => done(null, newTeam))
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
    update(teamId, team, done) {
      const validation = this.validate(team, true);
      if (validation.valid) {
        r.connect(config.rethinkdb)
          .then(conn => {
            r.table(this.tableName)
              .get(teamId)
              .update(team, config.model.update)
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
    delete(teamId, done) {
      r.connect(config.rethinkdb)
        .then(conn => {
          r.table(this.tableName)
            .get(teamId)
            .delete()
            .run(conn)
            .then(() => done(null))
            .error(err => done(err))
          ;
        })
      ;
    }
  };
  return Teams;
};
