import { useEffect } from "react"
import AddButton from "../components/AddButton"
import CreateProject from "../components/CreateProject"
import Hero from "../components/Hero"
import Projects from "../components/Projects"
import { loadProjects } from "../services/blockchain"

const Home = () => {
  useEffect(async () => {
    await loadProjects();
  }, [])

  return (
    <>
        <Hero />
        <Projects />
        <div className="flex justify-center items-center m-5">
            <button type='button' 
            className='inline-block px-6 py-2.5 bg-green-600 text-white font-medium
            text-xs leading-tight uppercase rounded-full shadow-md hover::bg-green-700'>
            Load More
            </button>
        </div>
        <CreateProject />
        <AddButton />
    </>
  )
}

export default Home