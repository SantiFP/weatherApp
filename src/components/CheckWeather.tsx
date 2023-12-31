import React, { useRef, useState, useEffect } from "react";
import { useContext } from "react";
import { CitiesContext } from "../store/cities-store";
import classes from "./CheckWeather.module.css";
interface Props {
  toggling: () => void;
}

const CheckWeather: React.FC<Props> = ({ toggling }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [cityInput, setCityInput] = useState<string>("");
  const [isUpscaled, setIsUpscaled] = useState<boolean>(false);

  const { newCity } = useContext(CitiesContext);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const checkWeatherHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredCity = inputRef.current?.value;

    if (!cityInput || !enteredCity) {
      return;
    }

    let words = enteredCity.split(" ");
    let capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    newCity(capitalizedWords.join(" ").trim());

    setCityInput("");
  };

  const handleClick = () => {
    setIsUpscaled(!isUpscaled);
    setTimeout(() => {
      setIsUpscaled(false);
    }, 300);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value);
  };

  const togglingHandler = () => {
    toggling();
  };

  return (
    <form onSubmit={checkWeatherHandler}>
      <div className="flex flex-col items-center pt-6 space-y-3 lg:space-y-0 ">
        <div className="choose">
          <label className="text-2xl bg-blue-500 text-white px-2 py-1">
            Choose city
          </label>
          <input
            value={cityInput}
            onChange={inputHandler}
            autoFocus
            ref={inputRef}
            className="outline-none bg-blue-200 py-2 pl-2"
            type="text"
          />
        </div>

        <div className="pt-2 lg:pt-3">
          <button
            onClick={() => {
              togglingHandler();
              handleClick();
            }}
            className={`buttonCheck ${isUpscaled ? classes.upscaled : ""} ${
              classes.check
            } `}
          >
            CHECK WEATHER
          </button>
        </div>
      </div>
    </form>
  );
};
export default CheckWeather;
