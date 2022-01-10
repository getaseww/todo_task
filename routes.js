const express=require('express');
const router=express.Router();
const userController=require('./controllers/user')
const taskController=require('./controllers/task')
const auth=require('./middleware/auth')

// user routes
router.post('/register',userController.register);
router.post('/login',userController.login);

// task routes
router.post('/save',auth,taskController.save);
router.get('/completed',auth,taskController.getCompleted)
router.get('/uncompleted',auth,taskController.getUncompleted)

module.exports=router;