import Identicons from "react-identicons"
import { FaEthereum } from 'react-icons/fa' 
import { setGlobalState } from "../store"

const ProjectDetails = () => {
  return (
    <div className="py-24 px-6 justify-center">
        <div className="flex justify-center items-center flex-col md:w-2/3 mx-auto">
            <div className="flex justify-start items-start sm:space-x-4 flex-wrap">
                <img
                    src="https://www.dogstrust.org.uk/images/400x300/assets/2022-04/dog2.png"
                    alt="project title" 
                    className="rounded-xl h-64 w-full sm:w-1/3 object-cover"
                />

                <div className="flex-1 sm:py-0 py-4">
                    <div className="flex flex-col justify-start flex-wrap">
                        <h5 className="text-gray-900 text-sm font-bold mb-2">
                         Local dog shelter
                        </h5>
                        <small className="text-gray-500">2 days left</small>
                    </div>

                    <div className="flex justify-between items-center w-full pt-2">
                        <div className="flex justify-start space-x-2">
                            <Identicons className="rounded-full shadow-md" string="0x9e....13af" size={15} />
                            <small className="text-gray-700">0x9e....13af</small>
                            <small className="text-gray-500 font-bold">{14} Backings</small>
                        </div>

                        <div className="font-bold">
                            <small className="text-gray-500 ">Open</small>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-sm font-light mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
            ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
             not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
            <div className="w-full bg-gray-300 mt-4">
                <div className="bg-green-600 font-medium text-xs
                text-green-100 text-center p-1 leading-none
                rounded-l-full" style={{width: '50%'}}>
                </div>
            </div>

            <div className="flex justify-between items-center font-bold mt-2">
                <small>{3} ETH Raised</small>
                <smal className="flex justify-start items-center">
                    <FaEthereum />
                    <span>{10} ETH</span>
                </smal>
            </div>

            <div className="flex justify-start items-center space-x-2 mt-4">
                <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-green-600
                    text-white font-medium text-xs leading-tight uppercase
                    rounded-full shadow-md hover:bg-green-700"
                    onClick={() => setGlobalState('backModal', 'scale-100')}>
                    Back Project
                </button>
                <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-blue-800
                    text-white font-medium text-xs leading-tight uppercase
                    rounded-full shadow-md hover:bg-green-700"
                    onClick={() => setGlobalState('updateModal', 'scale-100')}>
                    Edit
                </button>
                <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-red-600
                    text-white font-medium text-xs leading-tight uppercase
                    rounded-full shadow-md hover:bg-green-700"
                    onClick={() => setGlobalState('createModal', 'scale-100')}>
                    Delete
                </button>
                <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-orange-600
                    text-white font-medium text-xs leading-tight uppercase
                    rounded-full shadow-md hover:bg-green-700"
                    onClick={() => setGlobalState('createModal', 'scale-100')}>
                    Payout
                </button>
            </div>          
        </div>
    </div>
  )
}

export default ProjectDetails