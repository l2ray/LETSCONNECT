const jwt = require('jsonwebtoken');
const config = require('config');
const midWare = (req,res,next)=>{
    const token = req.header('x-token-value');
    if(!token){
        return res.status(401).json({"Status":"Error","msg":"Sorry You need to provide a Token..."});
    }
    try{
        const decoded = jwt.verify(token,config.get('secretKey'));
        req.user = decoded;
        next();
    }catch(e){
        console.log(e);
        return res.status(401).json({"Status":"Error","msg":"Sorry You need to provide a valid Token..."});
    }
}
//https://www.youtube.com/watch?v=vIxGDq1SPZQ
//https://www.youtube.com/watch?v=Wvf0mBNGjXY Docker
// https://www.youtube.com/watch?v=T6mlCqS--xc
module.exports = midWare