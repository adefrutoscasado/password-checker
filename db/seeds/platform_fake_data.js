
exports.seed = function(knex, Promise) {
  return knex('platform').del()
    .then(function () {
      return knex('platform').insert([
        {id: 1, name: 'platform_1'},
        {id: 2, name: 'platform_2'},
        {id: 3, name: 'platform_3'}
      ]);
    });
};
