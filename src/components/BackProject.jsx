import { FaTimes } from 'react-icons/fa'
import { useGlobalState } from '../store'
import { setGlobalState } from '../store'

const BackProject = () => {
    const [backModal] = useGlobalState('backModal')
    
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex 
    items-center justify-center bg-black bg-opacity-50 transform 
    transition-transform duration-300 ${backModal}`}>

        <div className="bg-white shadow-xl shadow-black rounded-xl
        w-11/12 md:2-2/5 h-7/12 p-6">
            <form className="flex flex-col">
                <div className="flex justify-between item-center">
                        <p className="font-semibold">#Project Title</p>
                        <button type="button" className="border-0 bg-transparent focus:outline-none"
                        onClick={() => setGlobalState('backModal', 'scale-0')}
                        >
                            <FaTimes />
                        </button>
                </div>        
                <div className='flex justify-center items-center mt-5'>
                    <div className="shrink-0 rounded-xl overflow-hidden h-25 w-25">
                        <img
                    src="https://www.dogstrust.org.uk/images/400x300/assets/2022-04/dog2.png"
                    alt="project title" 
                    className="object-cover h-full w-full cursor-pointer"/>
                    </div>
                </div>
                <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                    <input className="block w-full bg-transparent border-0 text-slate-500
                    focus:outline-none focus:ring-0" type="number" step={0.01}
                    min={0.01} name="amount" placeholder="Amount (ETH)" required />
                </div>
                <button
                    type="submit"
                    className="inline-block px-6 py-2.5 bg-green-600
                    text-white font-medium text-md leading-tight rounded-full shadow-md
                    hover:bg-green-700 mt-5">
                    Back Project
                </button>
            </form>
        </div>
    </div>
  )
}

export default BackProject