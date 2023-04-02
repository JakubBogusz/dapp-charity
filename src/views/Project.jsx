import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SupportProject from "../components/SupportProject"
import DeleteProject from "../components/DeleteProject"
import ProjectDetails from "../components/ProjectDetails"
import ProjectSupporters from "../components/ProjectSupporters"
import UpdateProject from "../components/UpdateProject"
import { loadProject, getSupporters } from "../services/blockchain"
import { useGlobalState } from "../store"
import Footer from "../components/Footer"

const Project = () => {
   const { id } = useParams();
   const [loaded, setLoaded] = useState(false);
   const [project] = useGlobalState('project');
   const [supporters] = useGlobalState('supporters');

   useEffect(async () => {
      await loadProject(id);
      await getSupporters(id);
      setLoaded(true);
   }, [])

  return loaded ? (
    <>
        <ProjectDetails project={project}/>
        <ProjectSupporters supporters={supporters}/>
        <UpdateProject project={project}/>
        <DeleteProject project={project}/>
        <SupportProject project={project}/>
        <Footer />
    </>
  ) : null
}

export default Project
