module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
      validate: {
        isIn: [
          ['user', 'admin'],
        ],
      },
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isIn: [
          [true, false],
        ],
      },
    },
  }, {
    modelName: 'user',
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,
    // I want updatedAt to actually be called update_at
    updatedAt: 'update_at',
    createdAt: 'create_at',
    // And deletedAt to be called delete_at (remember to enable paranoid for this to work)
    deletedAt: 'delete_at',
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,
    // Will automatically set field option for all attributes to snake cased name.
    // Does not override attribute with field option already defined
    underscored: true,
    // validate: {
    //   bothCoordsOrNone() {
    //     if ((this.latitude === null) !== (this.longitude === null)) {
    //       throw new Error('Require either both latitude and longitude or neither')
    //     }
    //   }
    // },
    // define the table's name
    tableName: 'table_user',
    // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
    // to the model and throw an OptimisticLockingError error when stale instances are saved.
    // Set to true or a string with the attribute name you want to use to enable.
    version: true,
    comment: "I'm a table comment!",
    // Sequelize instance
    sequelize,
  });

  return User;
};
