import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../firebaseAuth";
import person from "../person.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/weather");
  }, [user, loading]);

  return (
    <div className="w-full flex flex-row pt-[10rem]">
      <div className="w-1/2 hidden lg:block">
        <img src={person} alt="person" />
      </div>
      <div className=" w-full lg:w-1/2 flex flex-col gap-5 text-3xl justify-center items-center p-10">
        <input
          className="p-2  text-black"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          className="p-2  text-black"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="bg-green-600 p-2 px-3  font-semibold w-[22rem] hover:bg-green-700"
          onClick={() => signInWithEmailAndPassword(auth, email, password)}
        >
          Login
        </button>
        <button
          className="bg-green-600 p-2 px-3  font-semibold w-[22rem] hover:bg-green-700"
          onClick={signInWithGoogle}
        >
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div className="text-2xl">
          Don't have an account? <Link to="/signup">Register</Link> now.
        </div>
      </div>
    </div>
  );
};
export default Login;
