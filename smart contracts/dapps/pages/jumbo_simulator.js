import Web3 from "web3"
import detectEthereumProvider from "@metamask/detect-provider"
import jumboSimulatorDeployedContractGanacheTest from "../smart-contracts/jumbo-simulator-ganachetest"
import { useEffect, useState } from "react"

const JumboSimulator = () => {
    const [web3, setWeb3] = useState(null)
    const [walletStatus, setWalletStatus] = useState('Connect Wallet')
    const [totalSoldTickets, setTotalSoldTickets] = useState('')
    const [myTickets, setMyTickets] = useState('')
    const [myWalletAddress, setMyWalletAddress] = useState(null)
    const [blockchainContract, setBlockchainContract] = useState(null)
    const [ticketAmount, setTicketAmount] = useState(0)
    const [deployerAddress, setDeployerAddress] = useState('')
    const [soldTickets, setSoldTickets] = useState([])

    useEffect(() => {
        layoutIfNeeded()
    }, [blockchainContract])

    const layoutIfNeeded = () => {
        // TODO to get total sold tickets and my tickets
        if (blockchainContract) {
            callGetMyTickets()
            callTotalSoldTickets()
        }
    }

    const onConnectWallet = async () => {
        const provider = await detectEthereumProvider()
        if (provider) {
            try {
                await provider.request({ method: 'eth_requestAccounts' })
                const web3 = await new Web3(provider)
                setWeb3(web3)
                setWalletStatus("Connected Wallet => " + provider.selectedAddress)
                const walletAddress = await web3.eth.getAccounts()
                setMyWalletAddress(walletAddress[0])
                const deployedContract = await jumboSimulatorDeployedContractGanacheTest(web3)
                setBlockchainContract(deployedContract)
                setDeployerAddress(await deployedContract.methods.deployer().call())
            } catch (err) {
                window.alert(err.message)
            }
        }
    }

    const callGetMyTickets = async() => {
        const ticket = await blockchainContract.methods.getMyTickets().call({
            from: myWalletAddress
        })
        const contentTicket = "Purchased Tickets: " + ticket.totalTickets
        setMyTickets(contentTicket)
    }
    
    const callTotalSoldTickets = async() => {
        const sTickets = await blockchainContract.methods.getTotalSoldTickets().call()
        setTotalSoldTickets('Total Sold Tickets : ' + sTickets.length)
        setSoldTickets(sTickets)
    }

    const callTicketOwners = async(ticketID) => {
        const ticketOwner = await blockchainContract.methods.getTicketOwner(ticketID).call()
        window.alert("Ticket Owner is " + ticketOwner + "\nTicket ID is " + ticketID)
    }

    const buyLotteries = async (ticketCount) => {
        try {
            await blockchainContract.methods.buyLotteries(ticketCount).send({
                from: myWalletAddress,
                value: web3.utils.toWei('0.0055', 'ether') * ticketCount
            })
            layoutIfNeeded()
        } catch (err) {
            window.alert(err.message)
        }
    }

    const chooseWinner = async() => {
        try {
            await blockchainContract.methods.chooseWinner().send({
                from: myWalletAddress
            }) 
        }catch(err) {
            window.alert(err.message)
        }
    }

    const soldTicketUI = () => {
        let menuItems = []
        for (var i = 0; i < soldTickets.length; i++) {
            menuItems.push(<button onClick={() => callTicketOwners(soldTickets[i])} className="bg-teal-500 shadow-lg rounded-lg shadow-blue-500/50 p-4 text-slate-50 overflow-hidden" key={i}>{soldTickets[i]}</button>)
        }
        return <div className="grid grid-flow-row auto-rows-max grid-cols-5 gap-4">{menuItems}</div>
    }

    const buyUI = () => {
        if (walletStatus !== "Connect Wallet") {
            return <div className="flex space-x-4"><input type="number" className="mt-1 block w-1/4 px-3 py-2 border border-teal-500 rounded-md text-sm placeholder-slate-300" placeholder="Input Ammount ..." onChange={onChangeTicketAmmounts}></input><button onClick={() => buyLotteries(ticketAmount)} className="bg-cyan-500 shadow-lg rounded-lg shadow-blue-500/50 p-4 text-slate-50">Buy</button></div>
        }
    }

    const chooseWinnerUI = () => {
        if (deployerAddress === myWalletAddress) {
            return <div  className="flex space-x-4"><button onClick={chooseWinner} className="bg-red-500 shadow-lg rounded-lg shadow-teal500/50 p-4 text-slate-50">Choose Winner</button></div>
        }
    }

    const onChangeTicketAmmounts = ctx => {
        setTicketAmount(ctx.target.value)
    }

    return (
        <div>
            <nav className="bg-cyan-300 w-auto">
                <div className="flex justify-center">
                    <h1 className="text-5xl font-bold text-white py-4">
                        Jumbo Lottery JumboSimulator
                    </h1>
                </div>
                <div className="grid justify-items-end mx-10">
                    <button onClick={onConnectWallet} className="bg-cyan-500 shadow-lg rounded-lg shadow-blue-500/50 p-4 text-slate-50">
                        {walletStatus}
                    </button>
                    <br/>
                </div>
            </nav>
            <br/>
            <div className="mx-10">
                <div className="w-1/2 border rounded border-2 border-teal-400">
                    <div className="w-50 h-auto px-4">
                        {myTickets}
                    </div>
                    <div className="flex items-center">
                        <h2 className="text-5xl font-bold">
                            {totalSoldTickets}
                        </h2>
                    </div>
                </div>
                <br/>
                {soldTicketUI()}
                <br/><br/>
                {buyUI()}
                <br/>
                {chooseWinnerUI()}
            </div>
        </div>
    )
}

export default JumboSimulator