import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sendPasswordReset } from "../firebaseAuth";
import person from "../person.jpg";

const Reset = () => {
  const [email, setEmail] = useState("");
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
      <div className="w-1/2  hidden lg:block ">
        <img src={person} alt="person" />
      </div>
      <div className=" w-full lg:w-1/2 flex flex-col gap-5 text-3xl justify-center items-center p-10">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          onClick={() => sendPasswordReset(email)}
          className="bg-green-600 py-2 px-1  font-semibold w-[22rem] text-xl hover:bg-green-700"
        >
          Send password reset email
        </button>
        <div className="text-xl">
          Don't have an account? <Link to="/signup">Register</Link> now.
        </div>
      </div>
    </div>
  );
};
export default Reset;
