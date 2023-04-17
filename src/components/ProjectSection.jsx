import { setGlobalState, useGlobalState } from "../store"

const ProjectSection = () => {
   const [stats] = useGlobalState('stats');

  return (
    <div id="projectSection" className="text-center bg-white text-gray-800 pt-16 pb-16 px-6">
      <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight mb-12">
        <span>Create and support beautiful ideas</span>
        <span className="text-green-600"> with us</span>
      </h1>
      <div className="flex justify-center items-center space-x-2">
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-green-700"
          onClick={() => setGlobalState('createModal', 'scale-100')}
        >
          Add Project
        </button>

        <button
          type="button"
          className="inline-block px-6 py-2.5 border border-green-600
          font-medium text-xs leading-tight uppercase text-green-600
          rounded-full shadow-md bg-transparent hover:bg-green-700
          hover:text-white"
        >
          Support Projects
        </button>
      </div>

      <div className="flex justify-center items-center mt-10 bg-gray-100">
        <div
          className="flex flex-col justify-center items-center
          h-20 border shadow-md w-full"
        >
          <span
            className="text-lg font-bold text-green-900
            leading-5"
          >
            {stats?.totalProjects || 0}
          </span>
          <span>Projects</span>
        </div>
        <div
          className="flex flex-col justify-center items-center
          h-20 border shadow-md w-full"
        >
          <span
            className="text-lg font-bold text-green-900
            leading-5"
          >
            {stats?.totalSupporters || 0}
          </span>
          <span>Supporters</span>
        </div>
        <div
          className="flex flex-col justify-center items-center
          h-20 border shadow-md w-full"
        >
          <span
            className="text-lg font-bold text-green-900
            leading-5"
          >
            {stats?.totalDonations || 0} ETH
          </span>
          <span>Donated</span>
        </div>
      </div>
    </div>
  )
}

export default ProjectSection;
