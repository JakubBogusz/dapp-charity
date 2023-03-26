import { FaTimes } from 'react-icons/fa'
import { useGlobalState } from '../store'
import { setGlobalState } from '../store'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { createProject } from '../services/blockchain'

const CreateProject = () => {
  const [createModal] = useGlobalState('createModal');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState('');
  const [imageURL, setImageURL] = useState('');

  const toTimestamp = (dateString) => {
    const dateObject = Date.parse(dateString);
    return dateObject / 1000;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !cost || !date || !imageURL) {
      return;
    }

    const params = {
      title,
      description,
      imageURL,
      cost,
      expiresAt: toTimestamp(date),
    }

    await createProject(params);
    toast.success('Project created successfully, will reflect in 30 seconds.');
    onClose();
  }

  const onClose = () => {
    setGlobalState('createModal', 'scale-0');
    reset();
  }

  const reset = () => {
    setTitle('');
    setCost('');
    setDate('');
    setImageURL('');
    setDescription('');
  }

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex
      items-center justify-center bg-black bg-opacity-50 transform
      transition-transform duration-300 ${createModal}`}>

      <div className="bg-white shadow-xl shadow-black rounded-xl md:mt-24
          w-10/12 sm:w-3/4 md:w-3/5 h-3/4 overflow-y-auto p-10">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between item-center">
            <p className="font-semibold">Add Project</p>
            <button type="button" className="border-0 bg-transparent focus:outline-none"
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>
          <div className='flex justify-center items-center mt-5'>
            <div className="rounded-xl overflow-hidden h-32 w-32">
              <img
                src={imageURL || "https://cdn.pixabay.com/photo/2016/12/07/08/17/volunteer-1888823_960_720.png"}
                alt="project title"
                className="h-full w-full cursor-pointer object-contain" />
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input className="block w-full bg-transparent border-0 text-slate-500
                            focus:outline-none focus:ring-0"
              type="text" name="title" placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title} required />
          </div>

          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input className="block w-full bg-transparent border-0 text-slate-500
                            focus:outline-none focus:ring-0" type="number" step={0.01}
              min={0.01} name="cost" placeholder="Cost (ETH)"
              onChange={(e) => setCost(e.target.value)}
              value={cost} required />
          </div>

          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input className="block w-full bg-transparent border-0 text-slate-500
                            focus:outline-none focus:ring-0" type="date" name="date" placeholder="Expires"
              onChange={(e) => setDate(e.target.value)}
              value={date} required />
          </div>

          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input className="block w-full bg-transparent border-0 text-slate-500
                            focus:outline-none focus:ring-0" type="url" name="imageUrl" placeholder="Image URL"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL} required />
          </div>

          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <textarea className="block w-full bg-transparent border-0 text-slate-500
                            focus:outline-none focus:ring-0" type="text" name="description" placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description} required />
          </div>
          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-green-600
                    text-white font-medium text-md leading-tight rounded-full shadow-md
                    hover:bg-green-700 mt-5">
            Submit Project
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProject
