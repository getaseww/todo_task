const Task=require('../models/Task')

exports.save=(req,res)=>{
    const {title,desc}=req.body;
    if(!(title)){
        res.status(400).json({
            message:'All fields are required',
        });
    }

    Task.create({
        title:title,
        desc:desc,
    })
    .then(data=>res.status(200).json({
        message:'Task created successfully.'
    }))
    .catch(error=>res.json({
        error:error,
    }));
};

exports.getCompleted=(req,res)=>{
    Task.findAll({
        where:{
            isCompleted:true,
        }
    }
    )
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(error=>{
        res.status(500).json({
            message:'Something went wrong',
        });
    });
};

exports.getUncompleted=(req,res)=>{
    Task.findAll({
        where:{
            isCompleted:false,
        }
    }
    )
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(error=>{
        res.status(500).json({
            message:'Something went wrong',
        });
    });
};