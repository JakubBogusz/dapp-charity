import React from 'react'
import { TbBusinessplan } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { connectWallet } from '../services/blockchain'
import { useGlobalState } from '../store'
import { truncate } from '../store'

const Navbar = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <header
      className="flex justify-between items-center p-5 bg-white shadow-lg fixed top-0 left-0 right-0 z-10"
    >
      <Link to="/" className='flex justify-start items-center text-xl text-black space-x-1'>
        <span>TrustFund</span>
        <TbBusinessplan />
      </Link>

      <div className="flex space-x-8">
        <Link to="/about" className="text-black hover:text-green-600">About</Link>
        <Link to="/previous-projects" className="text-black hover:text-green-600">Previous Projects</Link>
        <Link to="/decentralized-funds" className="text-black hover:text-green-700">Decentralized Funds</Link>
      </div>

      <div className='flex space-x-2 justify-center'>
        {connectedAccount ? (
          <button type='button'
            className='inline-block px-6 py-2.5 bg-green-600 text-white font-medium
              text-xs leading-tight uppercase rounded-full shadow-md hover::bg-green-700'
            onClick={connectWallet}>
            {truncate(connectedAccount, 4, 4, 11)}
          </button>
        ) : (
          <button type='button'
            className='inline-block px-6 py-2.5 bg-green-600 text-white font-medium
              text-xs leading-tight uppercase rounded-full shadow-md hover::bg-green-700'
            onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  )
}

export default Navbar
