const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model {}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    song_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    song_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    song_card_color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    drum_kit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    drum_sequencer_steps: {
      type: DataTypes.STRING,
    },
    effects_is_on: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    reverb_val: {
      type: DataTypes.INTEGER,
    },
    distortion_val: {
      type: DataTypes.DECIMAL(10,2),
    },
    delay_val: {
      type: DataTypes.DECIMAL(10,2),
    },
    feedback_val: {
      type: DataTypes.DECIMAL(10,2),
    },
    melody_is_on: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    melody_sequencer_steps: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    melody_reverb_val: {
      type: DataTypes.INTEGER,
    },
    melody_effect_val: {
      type: DataTypes.DECIMAL(10,2),
    },
    volume_val: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    compressor_val: {
      type: DataTypes.DECIMAL(10,2),
    },
    reverb_val: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
);

module.exports = Project;
