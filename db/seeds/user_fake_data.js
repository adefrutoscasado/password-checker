
exports.seed = function(knex, Promise) {
  return knex('user').del()
    .then(function () {
      return knex('user').insert([
        {id: 1, username: 'username_1'},
        {id: 2, username: 'username_2'},
        {id: 3, username: 'username_3'}
      ]);
    });
};
