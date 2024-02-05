import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseAuth";
import { MdOutlineWavingHand } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import { useNavigate } from "react-router-dom";

const Weather = () => {
  const [user, loading, error] = useAuthState(auth);
  const [city, setCity] = useState("lucknow");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response1 = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=ff0f515f240ada087f6389742831b7f7`
        );
        console.log(response1.data);

        const weatherDataArray = await Promise.all(
          response1.data.map(async (d) => {
            const response2 = await axios.get(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${d.lat}&lon=${d.lon}&appid=ff0f515f240ada087f6389742831b7f7`
            );
            return response2.data;
          })
        );

        setData(weatherDataArray);
        console.log(weatherDataArray);
      } catch (error) {
        console.log(error);
      }
    };

    getWeather();
  }, []);

  const weatherHandler = async (e) => {
    try {
      e.preventDefault();

      const response1 = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=ff0f515f240ada087f6389742831b7f7`
      );
      console.log(response1.data);

      const weatherDataArray = await Promise.all(
        response1.data.map(async (d) => {
          const response2 = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${d.lat}&lon=${d.lon}&appid=ff0f515f240ada087f6389742831b7f7`
          );
          return response2.data;
        })
      );

      setData(weatherDataArray);
      console.log(weatherDataArray);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTable = () => {
    navigate("/table");
  };

  return (
    <div className="pt-20 min-h-screen flex flex-col">
      <div className="p-5 flex flex-row gap-2 text-3xl items-center font-[Roboto] justify-between bg-[#8d45d0] text-white">
        <div className="flex flex-row">
          <div>
            <MdOutlineWavingHand />
          </div>
          <div>Hello {user?.displayName || user?.name}</div>
        </div>
        <div
          className="hover:cursor-pointer p-3 hover:bg-purple-900 rounded-2xl"
          onClick={handleTable}
        >
          Users
        </div>
      </div>
      <div className="text-center font-bold text-red-700 text-4xl pt-10">
        Welcome to Your one stop solution for your weather problems
      </div>
      <div className="flex flex-col items-center justify-center pt-10">
        <div className="flex flex-row items-center">
          <div>
            <input
              type="text"
              placeholder="name of city"
              className="p-2 border-2 rounded-2xl"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <ImSearch
              className="w-10 h-5 hover:scale-125 hover:cursor-pointer"
              onClick={weatherHandler}
            />
          </div>
        </div>
      </div>
      <div className="min-h-screen pt-10">
        <div className="flex flex-wrap justify-center">
          {data.map((d) => {
            return (
              <div key={d.id} className=" p-10 w-full flex flex-wrap gap-20 ">
                {Array.from({ length: 20 }).map((_, i) => (
                  <WeatherCard
                    key={i}
                    date={d.list[i * 2].dt_txt}
                    weather={d.list[i * 2].weather[0].main}
                    description={d.list[i * 2].weather[0].description}
                    temp={d.list[i * 2].main.temp}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Weather;
