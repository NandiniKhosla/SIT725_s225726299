document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('book-list');

    fetch('/api/books')
        .then(response => response.json())
        .then(books => {
            books.forEach(book => {
                const card = document.createElement('div');
                card.className = 'book-card';
                
                // Handle Decimal128 format
                const price = book.price.$numberDecimal ? book.price.$numberDecimal : book.price;

                // 1. Create the HTML structure
                // We REMOVE the onclick="..." attribute here to avoid the quote error
                card.innerHTML = `
                    <h3>${book.title}</h3>
                    <p class="author">by ${book.author}</p>
                    <p class="meta">${book.genre} (${book.year})</p>
                    <p class="price">Price: $${price} AUD</p>
                    <button class="summary-btn">View Summary</button>
                `;

                // 2. Attach the event listener securely via JavaScript
                // This handles special characters (like ' or "") automatically
                const btn = card.querySelector('.summary-btn');
                btn.addEventListener('click', () => {
                    alert(book.summary);
                });

                bookList.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching books:', error));
});