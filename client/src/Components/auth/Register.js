import React,{useState} from 'react'
import axios from 'axios';

export const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [password2,setPassword2] = useState("");
    

    const capture = (e)=>{
        switch(e.target.name){
            case "name":
                setName(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "password2":
                setPassword2(e.target.value);
                break;

        }
    }
    const saveData = async(e)=>{
        try {
            e.preventDefault();
            const newUser = {
                "name":name,
                "email":email,
                "password":password,
                "conPass":password2,
            }
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const body = JSON.stringify(newUser);
            const res = await axios.post("/api/user",body,config);
            console.log(res);
        } catch (error) {
            console.log(error.message)
        }
        // console.log(name);
        // console.log(email);
        // console.log(password);
        // console.log(password2);
    }
    return (
        <section className="containerss">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form"  onSubmit={saveData}>
          <div className="form-group">
            <input type="text" placeholder="Name" value={name} onChange={e=>{capture(e)}} name="name" required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" value={email} onChange={e=>{capture(e)}} name="email" />
            <small className="form-text"
              >This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small
            >
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={e=>{capture(e)}}
              placeholder="Password"
              name="password"
              minLength="6"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password2}
              onChange={e=>{capture(e)}}
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <a href="login.html">Sign In</a>
        </p>
      </section>
    )
}
