import abi from '../abis/src/contracts/DCharity.sol/DCharity.json'
import address from '../abis/contractAddress.json'
import { getGlobalState, setGlobalState } from '../store'
import { ethers } from 'ethers'

const { ethereum } = window
const contractAddress = address.address
const contractAbi = abi.abi
let tx

const connectWallet = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    } catch (error) {
        reportError(error)
    }
}

const isWalletConnected = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({ method: 'eth_accounts' })
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())

        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload()
        })

        window.ethereum.on('accountsChanged', async () => {
            setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
            await isWalletConnected()
        })

        if (accounts.length) {
            setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
        } else {
            alert('Please connect wallet.')
            console.log('No accounts found.')
        }
    } catch (error) {
        reportError(error)
    }
}

const getEthereumContract = async () => {
    const connectedAccount = getGlobalState('connectedAccount');

    if (connectedAccount) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        return contract;
    } else {
        return getGlobalState('contract');
    }
}

const createProject = async ({
    title,
    description,
    imageURL,
    cost,
    expiresAt,
}) => {
    try {
        if (!ethereum) return alert('Please install Metamask wallet.')

        const contract = await getEthereumContract();
        cost = ethers.utils.parseEther(cost);
        await contract.createProject(title, description, imageURL, cost, expiresAt);
        // await tx.wait()
        // await loadProjects()
    } catch (error) {
        reportError(error);
    }
}

const loadProjects = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask wallet.');
  
      const contract = await getEthereumContract();
      const projects = await contract.getProjects();
      const stats = await contract.stats();
  
        //   setGlobalState('stats', structureStats(stats))
        //   setGlobalState('projects', structuredProjects(projects))
        console.log(projects)
        console.log(stats)
    } catch (error) {
      reportError(error)
    }
  }

const reportError = (error) => {
    console.log(error.message)
    throw new Error('No ethereum object.')
}

export { connectWallet, isWalletConnected, createProject, loadProjects }