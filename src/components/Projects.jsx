import { Link } from "react-router-dom"
import Identicons from "react-identicons"

const Projects = ({ projects }) => {
    return (
        <div className="flex flex-col px-6">
            <div className="flex justify-center items-center flex-wrap">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </div>
    )
}

const ProjectCard = ({ project }) => (
    <div id="projects" className="rounded-lg shadow-lg bg-white w-64 m-4">
        <Link to={'/projects/' + project.id}>
            <img
                src={project.imageURL}
                alt={project.title}
                className="rounded-xl h-64 w-full"
            />
            <div className="p-4">
                <div className="flex flex-col">
                    <h5>{project.title}</h5>
                    <div className="flex justify-between items-center mb-3">
                        <Identicons className="rounded-full 
                            shadow-md" string="0x15...1ea2" size={15}
                        />
                        <small className="text-gray-700">0x15...1ea2</small>
                    </div>
                    <small className="text-gray-500">
                        2 days left
                    </small>
                </div>

                <div className="w-full bg-gray-300">
                    <div className="bg-green-600 font-medium text-xs
                        text-green-100 text-center p-0.5 leading-none
                        rounded-l-full" style={{ width: '50%' }}>
                    </div>
                </div>

                <div className="flex justify-between items-center flex-wrap 
                mt-4 mb-2 text-gray-500 font-bold">
                    <small>{14} Backers</small>
                    <div>
                        <small className="text-green-500">Open</small>
                    </div>
                </div>
            </div>
        </Link>
    </div>
)

export default Projects