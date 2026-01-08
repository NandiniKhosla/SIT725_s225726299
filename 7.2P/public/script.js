// Connect to the Socket.IO server
const socket = io();

// UI Elements
const priceEl = document.getElementById('currentPrice');
const bidderEl = document.getElementById('bidderName');
const feedEl = document.getElementById('bidLog');
const errorEl = document.getElementById('errorMsg');

// 1. Listen for initial data when we first connect
socket.on('initialData', (data) => {
    updateDisplay(data.currentBid, data.highestBidder);
    // Populate history
    feedEl.innerHTML = '';
    data.bidHistory.forEach(bid => addLog(bid));
});

// 2. Listen for updates when SOMEONE ELSE (or us) bids
socket.on('updateAuction', (data) => {
    updateDisplay(data.currentBid, data.highestBidder);
    addLog(data.latestBid);
    errorEl.textContent = ""; // Clear errors on success
    
    // Visual feedback
    priceEl.style.color = "#28a745";
    setTimeout(() => priceEl.style.color = "#007bff", 500);
});

// 3. Listen for specific errors meant for this user
socket.on('bidError', (msg) => {
    errorEl.textContent = msg;
});

// Helper: Submit Bid
function submitBid() {
    const name = document.getElementById('userName').value;
    const amount = document.getElementById('bidAmount').value;

    if(name && amount) {
        // Emit the event to the server
        socket.emit('placeBid', { name, amount });
    } else {
        errorEl.textContent = "Please enter both name and amount.";
    }
}

// Helper: Update DOM Text
function updateDisplay(price, bidder) {
    priceEl.innerText = '$' + price;
    bidderEl.innerText = bidder;
}

// Helper: Add to Log
function addLog(bid) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${bid.time}:</strong> ${bid.name} bid $${bid.amount}`;
    feedEl.prepend(li);
}