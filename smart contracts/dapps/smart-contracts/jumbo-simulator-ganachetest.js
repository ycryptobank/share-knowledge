
const jumboSimulatorABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_season",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pieces",
				"type": "uint256"
			}
		],
		"name": "buyLotteries",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "chooseWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deployer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyTickets",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "totalTickets",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "tickets",
						"type": "uint256[]"
					}
				],
				"internalType": "struct JumboSimulator.Customer",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ticketId",
				"type": "uint256"
			}
		],
		"name": "getTicketOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalSoldTickets",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const jumboSimulatorDeployedContractGanacheTest = (web3) => {
    return new web3.eth.Contract(
        jumboSimulatorABI,
        "0x7660D1a823Ae70f9D309C4D62DC7Bfc18D4D98aE"
    )
}

export default jumboSimulatorDeployedContractGanacheTest