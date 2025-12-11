document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Target the button and the list container
    const getBooksBtn = document.getElementById('btn-get-books');
    const bookList = document.getElementById('book-list');

    // 2. Attach event listener to "Get All Books" button
    getBooksBtn.addEventListener('click', () => {
        fetch('/api/books')
            .then(response => response.json())
            .then(books => {
                // Clear previous list if any
                bookList.innerHTML = '';

                books.forEach(book => {
                    const card = document.createElement('div');
                    card.className = 'book-card';
                    
                    // Note: We show minimal info here. 
                    // Full details (like summary/price) will be fetched on click.
                    card.innerHTML = `
                        <h3>${book.title}</h3>
                        <p class="author">by ${book.author}</p>
                        <button class="details-btn" data-id="${book.id}">Show Full Details</button>
                    `;

                    // Add click event for the specific book
                    const btn = card.querySelector('.details-btn');
                    btn.addEventListener('click', () => {
                        fetchBookDetails(book.id);
                    });

                    bookList.appendChild(card);
                });
            })
            .catch(error => console.error('Error fetching books:', error));
    });

    // 3. Function to fetch specific book details (Requirement B)
    function fetchBookDetails(id) {
        console.log(`Fetching details for book: ${id}`);
        
        fetch(`/api/books/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(book => {
                // Handle Decimal128 format for price
                const price = book.price.$numberDecimal ? book.price.$numberDecimal : book.price;

                // Create a formatted string to show in the alert
                const details = `
Title: ${book.title}
Author: ${book.author}
Year: ${book.year}
Genre: ${book.genre}
Price: $${price} AUD
-------------------
Summary:
${book.summary}
                `;
                
                // Show the full details
                alert(details);
            })
            .catch(error => {
                console.error('Error fetching details:', error);
                alert('Could not retrieve book details.');
            });
    }
});