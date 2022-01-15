import axios from 'axios';
import React,{useState} from 'react'

export const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const captureData = (e)=>{
        const val = e.target.value;
        if(e.target.name === "email"){
                setEmail(val);
        }else{
            setPassword(val);
        }
    }
    const login = async e=>{
        try {
            
            e.preventDefault();
            const loginData = {
                "email":email,
                "password":password
            }
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const body = JSON.stringify(loginData);
            const res = await axios.post("/api/auth",body,config);
            console.log(res.status);
            console.log("####################");
            console.log(res); //lo2raymoori@gmail.comm
        } catch (error) {
            console.log("ABC...")
            console.log(error);
        }
    }
    return (
        <section className="container">
        <div className="alert alert-danger">
          Invalid credentials
        </div>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
        <form className="form" onSubmit={login}>
          <div className="form-group">
            <input
            value={email}
            onChange={captureData}
              type="email"
              placeholder="Email Address"
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <input
            value={password}
            onChange={captureData}
              type="password"
              placeholder="Password"
              name="password"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <a href="register.html">Sign Up</a>
        </p>
      </section>
    )
}
