let library = [];
let id = 1;

function Book(title, author, pages, read) {
    this.id = id++;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    addBooktoLibrary(this);
}

Book.prototype.isRead = () => (this.read) ? "You read that book" : "You haven't read that book";
Book.prototype.info = () => `${this.title} by ${this.author}, ${this.pages} pages. ${this.isRead()}.`;

function displayBook(book) {
    let bookParameters = ["id", "title", "author", "pages", "read"];
    let td;
    let tr = document.createElement('tr');
    bookParameters.forEach(param => {
        td = document.createElement('td');
        td.textContent = book[param];
        tr.appendChild(td)
    })
    document.querySelector('#book_table').appendChild(tr);
}

function addBooktoLibrary(book) {
    library.push(book);
    displayBook(book);
}

document.querySelector("form#add_book").onsubmit = (e) => {
    e.preventDefault();
    let name = document.querySelector("input[name='name']").value;
    let author = document.querySelector("input[name='author']").value;
    let pages = document.querySelector("input[name='pages']").value;
    let read = document.querySelector("input[name='read']:checked").value == "y" ? true : false;
    new Book(name, author, pages, read);
}

new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', '452', true);
new Book('The Two Towers', 'J.R.R. Tolkien', '632', false);
new Book('The Return of the King', 'J.R.R. Tolkien', '345', false);