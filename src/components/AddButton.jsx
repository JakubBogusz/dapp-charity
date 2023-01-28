import { setGlobalState } from "../store"
import { BsPlusLg } from "react-icons/bs"

const AddButton = () => {
  return (
    <div className="fixed right-10 bottom-10 flex space-x-2">
        <button
            type="button"
            className="flex justify-center items-center w-10 h-10 bg-green-600
            text-white font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-green-700"
            onClick={() => setGlobalState('createModal', 'scale-100')}
        >
            <BsPlusLg className="font-bold" size={21}/>
        </button>
    </div>
  )
}

export default AddButton