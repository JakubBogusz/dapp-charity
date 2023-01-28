const Projects = () => {
  return (
    <div className="flex flex-col px-6">
        <div className="flex justify-center items-center flex-wrap">
        {Array(6)
            .fill()
            .map((card, i) => (
                <ProjectCard key={i} />
            ))}
        </div>
    </div>
  )
}

const ProjectCard =({card}) => (
    <div id="projects" className="rounded-lg shadow-lg bg-white w-64 m-4">
        Card
    </div>
)

export default Projects