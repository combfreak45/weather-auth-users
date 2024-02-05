import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseAuth";
const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();




  const handleScroll = () => {
    setIsVisible(window.scrollY < 30);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/')
  };

  const handleHeader = () => {
    navigate("/");
  };

  return (
    <motion.div
      className="h-[15%] fixed top-0 left-0 w-full px-10 flex flex-row justify-between items-center font-['Roboto'] bg-slate-100 shadow-lg"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -100 }}
      transition={{ opacity: { duration: 1 }, y: { duration: 1 } }}
    >
      <motion.div
        className="text-4xl hover:cursor-pointer"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
        onClick={handleHeader}
      >
        Weather App
      </motion.div>
      {user ? (
        <div
          className="bg-[#271340] px-4 py-2 rounded-md hover:scale-125 hover:bg-[#8d45d0] hover:cursor-pointer text-white"
          onClick={handleLogout}
        >
          Logout
        </div>
      ) : (
          <div className="bg-[#271340] px-4 py-2 rounded-md hover:scale-125 hover:bg-[#8d45d0] hover:cursor-pointer text-white"
          onClick={handleLogin}>
            Login
          </div>
      )}
    </motion.div>
  );
};

export default Header;
