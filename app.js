require('dotenv').config();
const express=require('express');
const sequelize=require('./db');
const router=require('./routes');
const app=express();

const port = process.env.PORT||5000;
app.use(express.json());
app.use('/api',router);

sequelize.sync().then(result=>{
    app.listen(port,()=>{
        console.log('app started at port:',port);
    });
}).catch(error=>{
    console.log(error);
});



//{force:true}
// https://iqbroker.co