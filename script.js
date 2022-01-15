"use strict";

// Data Structures

const library = {
    library: [],
    id: 0,
    addBook: function (book) {
        this.library.push(book);
    },
    removeBook: function (bookId) {
        this.library = this.library.filter(book => book.id != bookId);
    },
    newBookId: function () {
        this.id++;
        return "book_" + this.id;
    }
}

function Book(title, author, pages, status) {
    this.id = library.newBookId();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.setStatus = function (status) {
    this.status = status;
}

// User Interface

const titleInput = document.querySelector("input[name='title']");
const authorInput = document.querySelector("input[name='author']");
const pagesInput = document.querySelector("input[name='pages']");
const readInput = document.getElementById("status");
const addBookBtn = document.querySelector("form#add_book");

function displayBook(book) {
    const table = document.querySelector('#book_table');
    const row = document.createElement('tr');
    const title = document.createElement('td');
    const author = document.createElement('td');
    const pages = document.createElement('td');
    const statusCell = document.createElement('td');
    const deleteCell = document.createElement('td');
    const status = document.createElement('select');
    const deleteBtn = document.createElement('button');

    row.setAttribute('id', book.id);
    title.textContent = book["title"];
    author.textContent = book["author"];
    pages.textContent = book["pages"];
    status.innerHTML += `<option value="Not read" ${(book.status=="Not red")?"selected":""}>Not read</option>`
    status.innerHTML += `<option value="Reading" ${(book.status=="Reading")?"selected":""}>Reading</option>`
    status.innerHTML += `<option value="Finished" ${(book.status=="Finished")?"selected":""}>Finished</option>`
    deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="trash-icon"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';

    status.addEventListener("change", () => {
        book.setStatus(status.value);
        sortTable();
    });
    deleteBtn.addEventListener('click', () => {
        library.removeBook(book.id);
        hideBook(book.id);
    });

    statusCell.appendChild(status)
    deleteCell.appendChild(deleteBtn)
    row.appendChild(title)
    row.appendChild(author)
    row.appendChild(pages)
    row.appendChild(statusCell)
    row.appendChild(deleteCell)
    table.appendChild(row);
}

function hideBook(bookId) {
    document.getElementById(bookId).remove();
}

function getFormInput() {
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = parseInt(pagesInput.value);
    let read = readInput.value;

    (!title) ? titleInput.classList.add('error'): titleInput.classList.remove('error');
    (!author) ? authorInput.classList.add('error'): authorInput.classList.remove('error');
    (!pages) ? pagesInput.classList.add('error'): pagesInput.classList.remove('error');

    if (title && author && pages) {
        titleInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
        read = "Not read";

        return new Book(title, author, pages, read);
    }
}

function addBook(e) {
    e.preventDefault();

    let newBook = getFormInput();
    if(newBook) {
        displayBook(newBook);
        library.addBook(newBook);
        sortTable();
    }
}

function sortTable() {
    let sortedColumn = document.querySelector("th[data-sorted='true']")
    sortedColumn.setAttribute('data-sorted', 'false');
    sortedColumn.click();
}

addBookBtn.onsubmit = addBook;

// Create some books

let book;

book = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'Finished');
displayBook(book);
library.addBook(book);
book = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 452, 'Reading');
displayBook(book);
library.addBook(book);
book = new Book('The Two Towers', 'J.R.R. Tolkien', 632, 'Not read');
displayBook(book);
library.addBook(book);
book = new Book('The Return of the King', 'J.R.R. Tolkien', 345, 'Not read');
displayBook(book);
library.addBook(book);
book = new Book('The Hunger Games', 'Suzanne Collins', 549, 'Not read');
displayBook(book);
library.addBook(book);
book = new Book('To Kill a Mockingbird', 'Harper Lee', 254, 'Not read');
displayBook(book);
library.addBook(book);
book = new Book('Pride and Prejudice', 'Jane Austen', 709, 'Not read');
displayBook(book);
library.addBook(book);
book = new Book('Animal Farm', 'George Orwell', 156, 'Not read');
displayBook(book);
library.addBook(book);
book = new Book('Gone with the Wind', 'Margaret Mitchell', 631, 'Not read');
displayBook(book);
library.addBook(book);
book = new Book('Memoirs of a Geicha', 'Arthur Golden', 690, 'Not read');
displayBook(book);
library.addBook(book);
book = new Book('Alice in Wonderland', 'Lewis Caroll', 254, 'Not read');
displayBook(book);
library.addBook(book);
book = new Book('Fahrenheit 451', 'Ray Bradbury', 254, 'Not read');
displayBook(book);
library.addBook(book);

setTimeout(sortTable, 10);