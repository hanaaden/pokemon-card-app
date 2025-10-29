import React from 'react'
import { useEffect, useState } from "react";
import "./../App.css";
import "./../index.css"
import axios from "axios";

function PokemonCards() {
    const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [warning, setWarning] = useState("");
  const [notFound, setNotFound] = useState("");
  const [display, setDisplay] = useState(false);
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [type, setType] = useState("");
  const [ability, setAbility] = useState();

  const handleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim().toLowerCase());
  };
  const HandleFetch = async () => {
    try {
      const URL = await axios.get(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
      const res = URL.data;
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
      if (!URL) {
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

const getTypeColor = (type: string): string => {
  const types: Record<string, string> = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  return types[type.toLowerCase()] || "add any default color";
};


  return (
    <>
      <h1 className="text-6xl mt-32 text-gray-300">Pokemon API</h1>

      {display && (
        <div className="bg-gray-600 m-12 rounded-3xl flex flex-col items-center">
          <p className="text-3xl">{name}</p>
          <img className="w-48 h-48 " src={image} alt={name} />
          <p className="p-2 font-bold">Height : {height} </p>
          <p className="p-2 font-bold">weight : {weight}</p>
          <p
  className="p-2 font-bold rounded-full px-6 mt-2"
  style={{ backgroundColor: getTypeColor(type) }}>
Type: {type}
</p>

          
          <p className="p-2 font-bold">Ability : {ability}</p>
        </div>
      )}

      <input
        type="text"
        placeholder="enter a name"
        className="border h-12 w-64 rounded-full bg-gray-600 text-white-400 p-4 mt-6"
        value={inputValue}
        onChange={handleEvent}
      />
      <p className="p-2">your search: {inputValue}</p>
      <p className="p-2 text-red-400">{warning}</p>
      <p className="text-red-400">{notFound}</p>

      <button className="mt-4 bg-gray-600 mb-12 p-4" onClick={HandleFetch}>
        search
      </button>
      
    </>
  )
}

export default PokemonCards