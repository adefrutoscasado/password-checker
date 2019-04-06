
exports.seed = function(knex, Promise) {
    return knex('password').del()
      .then(function () {
        return knex('password').insert([
          {id: 1, user_platform_id: 1, password: 'hash_1', score: 1},
          {id: 2, user_platform_id: 1, password: 'hash_2', score: 2},
          {id: 3, user_platform_id: 2, password: 'hash_3', score: 3},
          {id: 4, user_platform_id: 2, password: 'hash_4', score: 4},
          {id: 5, user_platform_id: 3, password: 'hash_5', score: 5},
          {id: 6, user_platform_id: 3, password: 'hash_6', score: 1},
          {id: 7, user_platform_id: 4, password: 'hash_7', score: 2},
          {id: 8, user_platform_id: 5, password: 'hash_8', score: 3},
          {id: 9, user_platform_id: 6, password: 'hash_9', score: 4},
          {id: 10, user_platform_id: 6, password: 'hash_10', score: 5}
        ]);
      });
  };
  