"use strict";

let library = [];
let id = 1;

function Book(title, author, pages, read) {
    this.id = "book_" + id++;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    addBooktoLibrary(this);
}

Book.prototype.changeReadStatus = function() {
    this.read = this.read ? false : true;
}

Book.prototype.info = function() {
    `${this.title} by ${this.author}, ${this.pages} pages.`;
}

function addBooktoLibrary(book) {
    library.push(book);
    displayBook(book);
}

function removeBookFromLibrary(bookId) {
    library = library.filter(book => book.id != bookId);
    hideBook(bookId);
}

function displayBook(book) {
    let td;
    let tr = document.createElement('tr');
    tr.setAttribute('id', book.id);

    ["title", "author", "pages"].forEach(param => {
        td = document.createElement('td');
        td.textContent = book[param];
        tr.appendChild(td)
    })

    let readCheckbox = document.createElement('input');
    readCheckbox.setAttribute('type', 'checkbox');
    readCheckbox.checked = book.read;
    readCheckbox.addEventListener('click', () => book.changeReadStatus());
    td = document.createElement('td');
    td.appendChild(readCheckbox);
    tr.appendChild(td);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = "delete";
    deleteButton.addEventListener('click', () => removeBookFromLibrary(book.id));
    td = document.createElement('td');
    td.appendChild(deleteButton);
    tr.appendChild(td);

    document.querySelector('#book_table').appendChild(tr);
}

function hideBook(bookId) {
    document.getElementById(bookId).remove();
}

document.querySelector("form#add_book").onsubmit = (e) => {
    e.preventDefault();
    let name = document.querySelector("input[name='name']").value;
    let author = document.querySelector("input[name='author']").value;
    let pages = document.querySelector("input[name='pages']").value;
    let read = document.querySelector("input[name='read']:checked").value == "yes" ? true : false;
    new Book(name, author, pages, read);
}

let book1 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', '452', true);
new Book('The Two Towers', 'J.R.R. Tolkien', '632', false);
new Book('The Return of the King', 'J.R.R. Tolkien', '345', false);