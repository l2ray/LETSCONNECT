const express = require('express');
const port = process.env.PORT || 5000;
const dbHandle = require('./config/db');
const userRouter = require('./ROUTES/userRoute');
const postRouter = require('./ROUTES/postRoute');
const profileRoute = require('./ROUTES/profileRoute');
const authRoute = require('./ROUTES/authRoute');
const app = express();
app.use(express.json());
dbHandle();

app.get('/',(req,res)=>{
    res.send("API Running");
});


app.use('/api/user',userRouter);
app.use('/api/profile',profileRoute.Router);
app.use('/api/auth',authRoute.Router);
app.use('/api/posts',postRouter)

app.listen(port ,()=>{
    console.log(`Server listening on Port ${port}`);
});