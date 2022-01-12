let library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    addBooktoLibrary(this);
}

Book.prototype.isRead = () => (this.read) ? "You read that book" : "You haven't read that book";
Book.prototype.info = () => `${this.title} by ${this.author}, ${this.pages} pages. ${this.isRead()}.`;

function addBooktoLibrary(book) {
    library.push(book);
}

function displayBooks() {
    let bookParameters = ["title", "author", "pages", "read"];
    let tr, td;

    library.forEach(book => {
        tr = document.createElement('tr')
        bookParameters.forEach(param => {
            td = document.createElement('td');
            td.textContent = book[param];
            tr.appendChild(td)
        })
        document.querySelector('#bookTable').appendChild(tr)
    })
}

new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', '452', true);
new Book('The Two Towers', 'J.R.R. Tolkien', '632', false);
new Book('The Return of the King', 'J.R.R. Tolkien', '345', false);

displayBooks();