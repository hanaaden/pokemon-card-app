import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [warning, setWarning] = useState("");
  const [notFound, setNotFound] = useState("");
  const [display, setDisplay] = useState(false);
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [type, setType] = useState();
  const [ability, setAbility] = useState();

  const handleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim().toLowerCase());
  };
  const HandleFetch = async () => {
    try {
      const URL = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${inputValue}`
      );
      const res = await URL.json();
      if (res.name === inputValue) {
        setName(res.name);
        setHeight(res.height);
        setWeight(res.weight);
        setType(res.types[0].type.name);
        setAbility(res.abilities[0].ability.name);
        setImage(res.sprites.front_default);
        setDisplay(true);
        setWarning("");
        setNotFound("");
      }
      if (!URL.ok) {
        setNotFound("Not found");
        setDisplay(false);
        return;
      }
      if (inputValue === "") {
        setWarning("Enter a name");
        setDisplay(false);
        setNotFound("");
        return;
      }
    } catch (err) {
      console.log(err);
      setNotFound("something went wrong");
      setWarning("");
    }
  };

  useEffect(() => {
    HandleFetch();
  }, []);

  return (
    <>
      <h1 className="text-6xl">Pokemon API</h1>

      {display && (
        <div className="bg-gray-600 m-12 rounded-3xl flex flex-col items-center">
          <p className="text-3xl">{name}</p>
          <img className="w-48 h-48 " src={image} alt={name} />
          <p className="p-2 font-bold">Height : {height} </p>
          <p className="p-2 font-bold">weight : {weight}</p>
          <p className="p-2 font-bold">types : {type}</p>
          <p className="p-2 font-bold">Ability : {ability}</p>
        </div>
      )}

      <input
        type="text"
        className="border h-12 w-64 rounded-full text-white-200 p-4 mt-6"
        value={inputValue}
        onChange={handleEvent}
      />
      <p className="p-2">your search: {inputValue}</p>
      <p className="p-2 text-red-400">{warning}</p>
      <p className="text-red-400">{notFound}</p>

      <button className="mt-4 bg-black-400 " onClick={HandleFetch}>
        search
      </button>
    </>
  );
}

export default App;
