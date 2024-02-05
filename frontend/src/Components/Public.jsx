import React from "react";
import { motion } from "framer-motion";
import img from "../clouds.png";
const Public = () => {
  return (
    <>
      <div className="h-1/2 xl:h-full w-full flex  flex-row ">
        <div className="w-full xl:w-1/2  flex flex-col justify-center pl-10 pt-16 gap-5">
          <div className="flex flex-row ">
            <div className="text-[4rem] xl:text-[7rem] font-bold">
              Weather Problems
            </div>
            <motion.div
              className="hidden xl:block text-[3rem] xl:text-[10rem] font-bold text-red-500 pt-[6rem] xl:pt-[5rem]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.4 }}
              transition={{ delay: 10, repeat: Infinity, duration: 1 }}
            >
              ?
            </motion.div>
          </div>
          <div className="text-red-600  text-xl font-semibold">
            We got you coverd through over weather solution!
          </div>
        </div>
        <div className="hidden xl:block w-1/2 overflow-hidden pl-16 pt-[6rem]">
          <img src={img} alt="clouds" className="w-[30rem]" />
        </div>
      </div>
      <div className="p-10">
        <motion.div className="h-[20rem] bg-blue-900 rounded-3xl p-10 xl:text-5xl text-white font-bold shadow-2xl">
          "Weather Solutions: Where Forecast Meets Functionality, Redefining
          Your Daily Climate Experience."
          <br />
          <br />
          Monthly 1k+ visits
        </motion.div>
      </div>
    </>
  );
};

export default Public;
