import { useEffect } from "react"
import AddButton from "../components/AddButton"
import CreateProject from "../components/CreateProject"
import Hero from "../components/Hero"
import Projects from "../components/Projects"
import { loadProjects } from "../services/blockchain"
import { useGlobalState } from "../store"
import OurMission from "../components/OurMission/OurMission"

const Home = () => {
  const [projects] = useGlobalState('projects');

  useEffect(async () => {
    await loadProjects();
  }, [])

  return (
    <>
        <Hero />
        {/* <OurMission /> */}
        <Projects projects={projects}/>
        <CreateProject />
        <AddButton />
    </>
  )
}

export default Home
