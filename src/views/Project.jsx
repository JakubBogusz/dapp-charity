import BackProject from "../components/BackProject"
import ProjectDetails from "../components/ProjectDetails"
import ProjectSupporters from "../components/ProjectSupporters"
import UpdateProject from "../components/UpdateProject"

const Project = () => {
  return (
    <>
        <ProjectDetails />
        <ProjectSupporters />
        <UpdateProject />
        <BackProject />
    </>
  )
}

export default Project