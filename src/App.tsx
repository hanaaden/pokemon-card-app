
import Home from "./pages/Home";
import Footer from "./pages/Footer";


function App() {

  return (
    <>
    <div className="flex flex-col min-h-screen">
  <main className="flex-grow">
     <Home/>
  </main>

  <Footer />
</div>
    </>
  );
}

export default App;
