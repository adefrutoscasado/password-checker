
exports.seed = function(knex, Promise) {
  return knex('user_platform').del()
    .then(function () {
      return knex('user_platform').insert([
        {id: 1, user_id: 1, platform_id: 1},
        {id: 2, user_id: 2, platform_id: 1},
        {id: 3, user_id: 2, platform_id: 2},
        {id: 4, user_id: 3, platform_id: 1},
        {id: 5, user_id: 3, platform_id: 2},
        {id: 6, user_id: 3, platform_id: 3}
      ]);
    });
};
