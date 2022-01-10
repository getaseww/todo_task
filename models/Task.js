const {Sequelize,DataTypes} =require('sequelize');
const sequelize=require('../db');

const Task=sequelize.define('task',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    desc:{
        type:DataTypes.TEXT,
        allowNull:true,
    },
    isCompleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    },
    
})
module.exports=Task;