# **SendETH DApp with Voting Functionality**

#### Link Demo []

A decentralized application (DApp) built with Ethers.js v6 that enables users to connect their Ethereum wallet, view account balance, send ETH, and participate in a voting contract on the Sepolia testnet.

**Features**
* Wallet Connection: Connect to MetaMask wallet
* Balance Display: View current ETH balance with refresh functionality
* ETH Transfer: Send ETH to any Ethereum address
* Smart Contract Voting: Participate in voting on Sepolia testnet
* Responsive Design: Modern, mobile-friendly interface
* Real-time Updates: Live transaction status and confirmations

**Architecture**

_Frontend Components_

* HTML/CSS: Modern responsive design with gradient backgrounds and animations
* JavaScript: Vanilla JS with Ethers.js v6 for blockchain interactions
* Ethers.js v6: Latest version with updated API for Ethereum interactions

**Smart Contract Integration
**
* Voting Contract: 0x35cd167FA931C6c5E07AbB2621846FC35D54baD6
* Network: Sepolia Ethereum Testnet (Chain ID: 11155111)
* ABI: Minimal interface for vote(uint256) function

**Key Functions**

* Wallet Management: Connection, account detection, network validation
* Balance Operations: Fetch and display ETH balance
* Transaction Handling: Send ETH with gas estimation and confirmation
* Contract Interaction: Vote casting with error handling and confirmations

**Prerequisites**

Before running this DApp, ensure you have:

**1. MetaMask Browser Extension**

* Download from metamask.io
* Create or import an Ethereum wallet


2. Sepolia Testnet Setup

* Add Sepolia network to MetaMask
* Get test ETH from Sepolia faucet

 **Setup Instructions**

1. Download the Project

```
# Clone or download the HTML file
# Save as index.html in your project directory
```
**2. Local Development Server**
   
## Option 1: Using Python
```
python -m http.server 8000

```
## Option 2: Using Live Server (VS Code extension)
```
# Right-click on index.html -> "Open with Live Server"
```

**3. MetaMask Configuration**

Add Sepolia Network (if not already added)

Get Test ETH:

* Visit Sepolia Faucet
* Enter your wallet address
* Request test ETH (may require social verification)


🎯 How to Use
1. Connect Wallet

* Open the DApp in your browser
* Click "Connect MetaMask"
* Approve the connection in MetaMask popup
* Ensure you're on Sepolia network

2. View Balance

* Your ETH balance displays automatically after connection
* Click "Refresh Balance" to update manually

3. Send ETH

* Enter recipient's Ethereum address
* Specify amount in ETH (e.g., 0.01)
* Click "Send ETH"
* Confirm transaction in MetaMask
* Wait for confirmation

4. Vote on Proposals

* Ensure you're connected to Sepolia network
* Choose between "Vote for Proposal 1" or "Vote for Proposal 2"
* Confirm transaction in MetaMask
* Wait for confirmation

**Network Requirements**

* Voting functionality: Requires Sepolia testnet
* ETH sending: Works on any Ethereum network
* The DApp will warn if you're not on Sepolia for voting

**Security Considerations**

* Only connect to trusted networks
* Verify recipient addresses carefully
* Start with small amounts for testing
* Keep your private keys secure

