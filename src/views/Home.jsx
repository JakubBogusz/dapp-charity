import { useEffect } from "react"
import AddButton from "../components/AddButton"
import CreateProject from "../components/CreateProject"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import OurMission from "../components/OurMission/OurMission"
import Projects from "../components/Projects"
import { loadProjects } from "../services/blockchain"
import { useGlobalState } from "../store"

const Home = () => {
  const [projects] = useGlobalState('projects');

  useEffect(async () => {
    await loadProjects();
  }, [])

  return (
    <>
        <Hero />
        <Projects projects={projects}/>
        <CreateProject />
        <AddButton />
        <OurMission />
        <Footer />
    </>
  )
}

export default Home
