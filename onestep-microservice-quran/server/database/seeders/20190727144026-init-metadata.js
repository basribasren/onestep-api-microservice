'use strict';

const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let data = fs.readFileSync('./data/metadata.json', 'utf8', function readFileCallback(err, data) {
      if (err) {
        return console.log('ERROR' + err.message)
      }
      return data
    });
    let metadata = JSON.parse(data)
    return queryInterface.bulkInsert('QuranMetadata', metadata, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('QuranMetadata', null, {});
  }
};
