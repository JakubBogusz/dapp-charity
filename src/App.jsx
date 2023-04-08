import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import { isWalletConnected } from "./services/blockchain"
import Home from "./views/Home"
import Project from "./views/Project"
import { ToastContainer } from "react-toastify"
import AboutPage from "./views/AboutPage"
import DecentralizedFunds from "./views/DecentralizedFunds"

const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    await isWalletConnected();
    console.log('Blockchain loaded.');
    setLoaded(true);
  }, [])

  return (
    <div className="min-h-screen relative">
      <Navbar />
      {loaded ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/decentralized-funds" element={<DecentralizedFunds />} />
          <Route path="/projects/:id" element={<Project />} />
        </Routes>
      ) : null}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div >
  )
}

export default App
