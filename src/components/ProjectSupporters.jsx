import { FaEthereum } from 'react-icons/fa'
import Identicon from 'react-identicons'

const ProjectSupporters = () => {
  return (
    <div className="flex flex-col justify-center items-start px-6 md:w-2/3 mx-auto">
        <div className="max-h-[calc(100vh_-_30rem)] overflow-y-auto
            shadow-md rounded-md w-full mb-10">
            <table className="min-w-full">
                <th className="border-b">
                    <tr>
                        <th scope="col" className="text-sm 
                        font-medium px-6 py-4 text-left">Supporter</th>
                    </tr>
                </th>
                <th className="border-b">
                    <tr>
                        <th scope="col" className="text-sm 
                        font-medium px-6 py-4 text-left">Donations</th>
                    </tr>
                </th>
                <th className="border-b">
                    <tr>
                        <th scope="col" className="text-sm 
                        font-medium px-6 py-4 text-left">Refunded</th>
                    </tr>
                </th>
                <th className="border-b">
                    <tr>
                        <th scope="col" className="text-sm 
                        font-medium px-6 py-4 text-left">Time</th>
                    </tr>
                </th>
                <tbody>
                    {Array(10).fill().map((backing, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="text-sm font-light px-6 py-4
                            whitespace-nowrap">
                                <div className='flex justify-start items-center space-x-2'>
                                    <Identicon className="h-10 w-10 object-contain rounded" 
                                    string={"0x2e...042a" + index} size={25} />
                                    <span>0x2e...042{index}</span>
                                </div>
                            </td>
                            <td className="text-sm font-light px-6 py-4
                            whitespace-nowrap">
                                <small className='flex justify-start items-center'>
                                    <FaEthereum />
                                    <span className='text-gray-700 font-medium'>{3} ETH</span>
                                </small>
                            </td>
                            <td className="text-sm font-light px-6 py-4
                            whitespace-nowrap">
                                {false ? 'Yes' : 'No'}
                            </td>
                            <td className="text-sm font-light px-6 py-4
                            whitespace-nowrap">
                                {new Date().getTime()}
                            </td>
                        </tr>       
                    ))}             
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ProjectSupporters