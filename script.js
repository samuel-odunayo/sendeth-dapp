let provider = null;
let signer = null;
let userAccount = null;


const VOTING_CONTRACT_ADDRESS = "0x35cd167FA931C6c5E07AbB2621846FC35D54baD6";
const VOTING_ABI = [
    "function vote(uint256 proposal) external"
];

let connectBtn, connectionStatus, balanceSection, sendSection, votingSection;
let accountBalance, refreshBalanceBtn, sendEthBtn, vote1Btn, vote2Btn;

function initializeElements() {
    connectBtn = document.getElementById('connectBtn');
    connectionStatus = document.getElementById('connectionStatus');
    balanceSection = document.getElementById('balanceSection');
    sendSection = document.getElementById('sendSection');
    votingSection = document.getElementById('votingSection');
    accountBalance = document.getElementById('accountBalance');
    refreshBalanceBtn = document.getElementById('refreshBalanceBtn');
    sendEthBtn = document.getElementById('sendEthBtn');
    vote1Btn = document.getElementById('vote1Btn');
    vote2Btn = document.getElementById('vote2Btn');
}


function checkMetaMask() {
    if (typeof window.ethereum === 'undefined') {
        showError('MetaMask is not installed. Please install MetaMask to use this DApp.');
        return false;
    }
    return true;
}

async function connectWallet() {
    if (!checkMetaMask()) return;

    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        if (accounts.length === 0) {
            throw new Error('No accounts found');
        }

        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        userAccount = accounts[0];

        const network = await provider.getNetwork();
        if (network.chainId !== 11155111n) {
            showError('Please switch to Sepolia testnet for voting functionality');
        }

        updateConnectionStatus(true);
        await updateBalance();
        showSections();

    } catch (error) {
        console.error('Connection error:', error);
        showError('Failed to connect wallet: ' + error.message);
    }
}

function updateConnectionStatus(connected) {
    if (connected) {
        connectionStatus.textContent = `Connected: ${userAccount.slice(0, 6)}...${userAccount.slice(-4)}`;
        connectionStatus.className = 'status connected';
        connectBtn.textContent = 'Connected';
        connectBtn.disabled = true;
    } else {
        connectionStatus.textContent = 'Not connected to wallet';
        connectionStatus.className = 'status disconnected';
        connectBtn.textContent = 'Connect MetaMask';
        connectBtn.disabled = false;
    }
}

function showSections() {
    balanceSection.style.display = 'block';
    sendSection.style.display = 'block';
    votingSection.style.display = 'block';
}

async function updateBalance() {
    if (!provider || !userAccount) return;

    try {
        const balance = await provider.getBalance(userAccount);
        const balanceInEth = ethers.formatEther(balance);
        accountBalance.textContent = `${parseFloat(balanceInEth).toFixed(4)} ETH`;
    } catch (error) {
        console.error('Balance error:', error);
        showError('Failed to fetch balance');
    }
}

async function sendETH() {
    const recipientAddress = document.getElementById('recipientAddress').value;
    const ethAmount = document.getElementById('ethAmount').value;
    const sendResult = document.getElementById('sendResult');

    if (!recipientAddress || !ethAmount) {
        showError('Please fill in all fields', sendResult);
        return;
    }

    if (!ethers.isAddress(recipientAddress)) {
        showError('Invalid recipient address', sendResult);
        return;
    }

    try {
        sendEthBtn.innerHTML = '<span class="loading"></span>Sending...';
        sendEthBtn.disabled = true;

        const tx = await signer.sendTransaction({
            to: recipientAddress,
            value: ethers.parseEther(ethAmount)
        });

        showSuccess(`Transaction sent! Hash: ${tx.hash}`, sendResult);

        const receipt = await tx.wait();
        showSuccess(`Transaction confirmed in block ${receipt.blockNumber}`, sendResult);

        await updateBalance();

        document.getElementById('recipientAddress').value = '';
        document.getElementById('ethAmount').value = '';

    } catch (error) {
        console.error('Send error:', error);
        showError('Failed to send ETH: ' + error.message, sendResult);
    } finally {
        sendEthBtn.innerHTML = 'Send ETH';
        sendEthBtn.disabled = false;
    }
}

async function vote(proposalNumber) {
    const votingResult = document.getElementById('votingResult');

    if (!signer) {
        showError('Please connect your wallet first', votingResult);
        return;
    }

    try {
        const network = await provider.getNetwork();
        if (network.chainId !== 11155111n) {
            showError('Please switch to Sepolia testnet to vote', votingResult);
            return;
        }

        const button = proposalNumber === 1 ? vote1Btn : vote2Btn;
        button.innerHTML = '<span class="loading"></span>Voting...';
        button.disabled = true;

        const votingContract = new ethers.Contract(
            VOTING_CONTRACT_ADDRESS,
            VOTING_ABI,
            signer
        );

        const tx = await votingContract.vote(proposalNumber);

        showSuccess(`Vote submitted! Transaction hash: ${tx.hash}`, votingResult);

        const receipt = await tx.wait();
        showSuccess(`Vote confirmed in block ${receipt.blockNumber}! Thank you for participating.`, votingResult);

    } catch (error) {
        console.error('Voting error:', error);
        let errorMessage = 'Failed to vote: ';

        if (error.message.includes('insufficient funds')) {
            errorMessage += 'Insufficient funds for gas fees';
        } else if (error.message.includes('user rejected')) {
            errorMessage += 'Transaction rejected by user';
        } else {
            errorMessage += error.message;
        }

        showError(errorMessage, votingResult);
    } finally {
        vote1Btn.innerHTML = 'Vote for Proposal 1';
        vote1Btn.disabled = false;
        vote2Btn.innerHTML = 'Vote for Proposal 2';
        vote2Btn.disabled = false;
    }
}

function showError(message, container = null) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;

    if (container) {
        container.innerHTML = '';
        container.appendChild(errorDiv);
    } else {
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }
}

function showSuccess(message, container = null) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success';
    successDiv.textContent = message;

    if (container) {
        container.innerHTML = '';
        container.appendChild(successDiv);
    } else {
        document.body.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    const connectBtn = document.getElementById('connectBtn');
    const refreshBalanceBtn = document.getElementById('refreshBalanceBtn');
    const sendEthBtn = document.getElementById('sendEthBtn');
    const vote1Btn = document.getElementById('vote1Btn');
    const vote2Btn = document.getElementById('vote2Btn');

    connectBtn?.addEventListener('click', connectWallet);
    refreshBalanceBtn?.addEventListener('click', updateBalance);
    sendEthBtn?.addEventListener('click', sendETH);
    vote1Btn?.addEventListener('click', () => vote(1));
    vote2Btn?.addEventListener('click', () => vote(2));
});

if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            updateConnectionStatus(false);
            balanceSection.style.display = 'none';
            sendSection.style.display = 'none';
            votingSection.style.display = 'none';
        } else {
            location.reload();
        }
    });

    window.ethereum.on('chainChanged', () => {
        location.reload();
    });
}

window.addEventListener('load', async () => {
    if (checkMetaMask() && window.ethereum.selectedAddress) {
        await connectWallet();
    }
});