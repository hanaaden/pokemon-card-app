import React from 'react'
import Footer from '../components/Footer'
import PokemonCards from '../components/PokemonCards'
function Home() {
  return (
      <div className="flex flex-col min-h-screen">
  <main className="flex-grow">
     <PokemonCards/>
  </main>

  <Footer />
</div>
  )
}

export default Home