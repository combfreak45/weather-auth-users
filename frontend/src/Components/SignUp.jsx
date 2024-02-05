import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebaseAuth";
import person from "../person.jpg";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/weather");
  }, [user, loading]);

  return (
    <div className="w-full flex flex-row pt-[10rem]">
      <div className=" w-1/2  hidden lg:block">
        <img src={person} alt="person" />
      </div>
      <div className=" w-full lg:w-1/2 flex flex-col gap-5 text-3xl justify-center items-center p-10">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          onClick={register}
          className="bg-green-600 p-2 px-3  font-semibold w-[22rem] hover:bg-green-700"
        >
          Register
        </button>
        <button
          onClick={signInWithGoogle}
          className="bg-green-600 p-2 px-3  font-semibold w-[22rem] hover:bg-green-700"
        >
          Register with Google
        </button>
        <div className="text-xl">
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
};
export default SignUp;
