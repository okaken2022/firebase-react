import React, { useState, useEffect } from 'react'
import styles from "./Login.module.css";
import {Button, FormControl, TextField, Typography} from "@material-ui/core";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user)=> {
      user && navigate("/")
    });
    return () => unSub();
  }, [navigate]);
  return (
    <div className={styles.login__root}>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <br/>
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          name="email"
          label="E-mail"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
         />
      </FormControl>
      <br/>
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
         />
      </FormControl>
      <br/>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={
          isLogin 
          ? async () => {
              try {
                await auth.signInWithEmailAndPassword(email, password);
                navigate("/")
              } catch (error:any) {
                alert(error.message)
              }
            } 
          : async () => {
              try {
                await auth.createUserWithEmailAndPassword(email, password);
                navigate("/")
              } catch (error:any) {
                alert(error.message)
              }
          }
        }
      >
        {isLogin ? "Login" : "Register"}
      </Button>
      <br/>
      <Typography align="center">
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create new account ?" : "Back to Login"}
        </span>
      </Typography>
    </div>
  )
}

export default Login;
