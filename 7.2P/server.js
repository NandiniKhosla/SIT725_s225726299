const express = require('express');
const app = express();
// Create an HTTP server from the Express app
const http = require('http').createServer(app);
// Bind Socket.IO to the HTTP server
const io = require('socket.io')(http);

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// --- Auction State (In-Memory) ---
let currentBid = 100; // Starting bid
let highestBidder = "No bids yet";
let bidHistory = [];

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // 1. Send the current state to the NEW user immediately upon connection
    socket.emit('initialData', { 
        currentBid, 
        highestBidder, 
        bidHistory 
    });

    // 2. Listen for a new bid from a client
    socket.on('placeBid', (data) => {
        const newAmount = parseInt(data.amount);

        // Validation: Bid must be higher than current
        if (newAmount > currentBid) {
            currentBid = newAmount;
            highestBidder = data.name;
            
            const timestamp = new Date().toLocaleTimeString();
            const bidEntry = { name: data.name, amount: currentBid, time: timestamp };
            
            // Limit history to last 10 bids
            bidHistory.unshift(bidEntry);
            if(bidHistory.length > 10) bidHistory.pop();

            // 3. Broadcast the NEW state to ALL connected clients
            io.emit('updateAuction', { 
                currentBid, 
                highestBidder,
                latestBid: bidEntry
            });
        } else {
            // Optional: Tell specific user their bid failed
            socket.emit('bidError', 'Bid must be higher than current price!');
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const port = 3000;
http.listen(port, () => {
    console.log(`Auction server running on http://localhost:${port}`);
});   

