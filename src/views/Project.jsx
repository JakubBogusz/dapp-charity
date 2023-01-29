import BackProject from "../components/BackProject"
import DeleteProject from "../components/DeleteProject"
import ProjectDetails from "../components/ProjectDetails"
import ProjectSupporters from "../components/ProjectSupporters"
import UpdateProject from "../components/UpdateProject"

const Project = () => {
  return (
    <>
        <ProjectDetails />
        <ProjectSupporters />
        <UpdateProject />
        <DeleteProject />
        <BackProject />
    </>
  )
}

export default Project