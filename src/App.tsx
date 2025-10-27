import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [name , setName] = useState("")
  const [image , setImage] = useState("")
  

  const HandleFetch = async(i:number)=>{
       const URL = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
       const res = await URL.json()
       setName(res.name )
       setImage(res.sprites.front_default)
  }
 useEffect(() => {
  let i = 1; 
  const interval = setInterval(() => {
    if (i <= 100) { 
      HandleFetch(i);
      i++;
    } else {
      clearInterval(interval); 
    }
  }, 2000); 

}, []);


  return (
    <>
      <h1 className='text-6xl'>Pokemon API</h1>
       <div className='bg-gray-600 text-white rounded-2xl p-12 mt-12  text-center'>
        <p className='text-6xl'>{name}</p>
       <img className='w-48 md:w-60 h-48 md:h-60 mx-auto' src={image} alt={name}/>
       </div>
      
    </>
  )
}

export default App
