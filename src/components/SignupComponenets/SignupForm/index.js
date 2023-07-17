import React, { useState } from 'react'
import InputComponents from '../../common/Inputs';
import Button from '../../common/Buttons';
import {auth, db, storage} from '../../../firebase'
import{ createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";

function SignupForm() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUp = async ()=>{
        console.log("Handling Signup...");
        setLoading(true);
        if(password == confirmPassword &&  
            password.length >= 6 && 
            fullName &&
            email
            ){
            try{
                //Creating user's account.
               const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
               ); 

               const user = userCredential.user;
               console.log("user", user)
                 // Saving user's details.
        await setDoc(doc(db, "users", user.uid), {
            name: fullName,
            email: user.email,
            uid: user.uid,
          });
           
          // save data in the redux, call the redux action.
          dispatch(
            setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
          );
          
          toast.success("User has been created!");
          setLoading(false);
          navigate("/profile");
            } catch(e){
                console.log("error", e);
                toast.error(e.message);
                setLoading(false);
            }
        }  else{
            if (password != confirmPassword) {
                toast.error(
                  "Please Make Sure your password and Confirm Password matches!"
                );
              } else if (password.length < 6) {
                toast.error(
                  "Please Make Sure your password is more than 6 digits long!"
                );
              } 
              //throw an error
              setLoading(false);
        }
     };


  return (
<>
<InputComponents
    state={fullName}
    setState={setFullName}
    placeholder="Full Name"
    type="text"
    required={true}
/>
<InputComponents
    state={email}
    setState={setEmail}
    placeholder="Email"
    type="text"
    required={true}
/>
<InputComponents
    state={password}
    setState={setPassword}
    placeholder="Password"
    type="password"
    required={true}
/>
<InputComponents
    state={confirmPassword}
    setState={setConfirmPassword}
    placeholder="Confirm Password"
    type="password"
    required={true}
/>
<Button text={loading ? "Loading..." : "Signup"}
 disabled={loading}
 onClick={handleSignUp} />
</>
  );
}

export default SignupForm;