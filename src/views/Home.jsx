import { useEffect } from "react"
import AddButton from "../components/AddButton"
import CreateProject from "../components/CreateProject"
import Footer from "../components/Footer"
import ProjectSection from "../components/ProjectSection"
import OurMission from "../components/OurMission"
import Projects from "../components/Projects"
import { loadProjects } from "../services/blockchain"
import { useGlobalState } from "../store"
import InfoBoxes from "../components/InfoBoxes"
import Hero from "../components/Hero"

const Home = () => {
  const [projects] = useGlobalState('projects');

  useEffect(async () => {
    await loadProjects();
  }, [])

  return (
    <>
        <Hero />
        <ProjectSection />
        <Projects projects={projects}/>
        <InfoBoxes />
        <CreateProject />
        <AddButton />
        <OurMission />
        <Footer />
    </>
  )
}

export default Home
