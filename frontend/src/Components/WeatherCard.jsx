import React from "react";
import img from "../clouds.png";
const WeatherCard = ({ date, weather, description, temp }) => {
  const [datee, time] = date.split(" ");

  return (
    <div className="flex flex-col justify-center items-center w-[20rem] ">
      <div>
        <img src={img} alt="weather" />
      </div>
      <div className="flex flex-col bg-purple-500 p-5 rounded-2xl text-white font-[Roboto] items-center w-[15rem]">
        <div>{datee}</div>
        <div>{time}</div>
        <div className="text-2xl text-red-200">{weather}</div>
        <div>{description}</div>
        <div>{temp}F</div>
      </div>
    </div>
  );
};

export default WeatherCard;
