import { Link } from "react-router-dom"
import Identicons from "react-identicons"
import { daysRemaining, truncate } from "../store"
import { FaEthereum } from "react-icons/fa"
import { useState, useEffect } from "react"

const Projects = ({ projects }) => {
  const [end, setEnd] = useState(1)
  const [count] = useState(1)
  const [collection, setCollection] = useState([])

  const getCollection = () => projects.slice(0, end)

  useEffect(() => {
    setCollection(getCollection())
  }, [projects, end])

  return (
    <div className="flex flex-col px-6 mb-5">
      <div className="flex justify-center items-center flex-wrap">
        {collection.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      {projects.length > 0 && projects.length > collection.length ? (
        <div className="flex justify-center items-center my-5">
          <button type='button'
            className='inline-block px-6 py-2.5 bg-green-600 text-white font-medium
                  text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-700'
            onClick={() => setEnd(end + count)}>
            Load More
          </button>
        </div>
      ) : null}
    </div>
  )
}

const ProjectCard = ({ project }) => {
  const expired = new Date().getTime() > Number(project.expiresAt + '000');

  return (
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
              <small className="text-gray-700">{truncate(project.owner, 4, 4, 11)}</small>
            </div>
            <small className="text-gray-500">
              {expired ? 'Expired'
                : daysRemaining(project.expiresAt)}{' '}
              left
            </small>
          </div>

          <div className="w-full bg-gray-300">
            <div className="bg-green-600 font-medium text-xs
                  text-green-100 text-center p-0.5 leading-none
                  rounded-l-full" style={{ width: `${project.raised / project.cost * 100}` }}>
            </div>
          </div>

          <div className="flex justify-between items-center font-bold mt-1 mb-2 text-gray-700">
            <small>{project.raised} ETH Raised</small>
            <small className="flex justify-start items-center">
              <FaEthereum />
              <span>{project.cost} ETH</span>
            </small>
          </div>

          <div className="flex justify-between items-center flex-wrap
             mt-4 mb-2 text-gray-500 font-bold">
            <small>
              {project.supporters} Supporter{project.supporters == 1 ? '' : 's'}
            </small>
            <div>
              {expired ? (
                <small className="text-red-500">Expired</small>
              ) : project?.status == 0 ? (
                <small className="text-gray-500">Open</small>
              ) : project?.status == 1 ? (
                <small className="text-green-500">Accepted</small>
              ) : project?.status == 2 ? (
                <small className="text-gray-500">Reverted</small>
              ) : project?.status == 3 ? (
                <small className="text-red-500">Deleted</small>
              ) : (
                <small className="text-orange-500">Paid</small>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Projects
