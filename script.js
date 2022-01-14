"use strict";

let library = [];
let id = 1;

function Book(title, author, pages, status) {
    this.id = "book_" + id++;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    addBooktoLibrary(this);
}

Book.prototype.setStatus = function(status) {
    this.status = status;
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

    let statusSelect = document.createElement('select');
    let selected;
    ["Not read", "Reading", "Finished"].forEach(status => {
        selected = status == book.status ? "selected" : "";
        statusSelect.innerHTML += `<option value="${status}" ${selected}>${status}</option>`
    })
    statusSelect.addEventListener("change", () => book.setStatus(statusSelect.value));
    td = document.createElement('td');
    td.appendChild(statusSelect);
    tr.appendChild(td);

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="trash-icon"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';
    deleteButton.addEventListener('click', () => removeBookFromLibrary(book.id));
    td = document.createElement('td');
    td.appendChild(deleteButton);
    tr.appendChild(td);

    document.querySelector('#book_table').appendChild(tr);
}

function hideBook(bookId) {
    document.getElementById(bookId).remove();
}

function sortTable() {
    let sortedColumn = document.querySelector("th[data-sorted='true']")
    sortedColumn.setAttribute('data-sorted', 'false');
    sortedColumn.click();
}

document.querySelector("form#add_book").onsubmit = (e) => {
    e.preventDefault();

    let titleInput = document.querySelector("input[name='title']");
    let authorInput = document.querySelector("input[name='author']");
    let pagesInput = document.querySelector("input[name='pages']");

    let title = titleInput.value;
    let author = authorInput.value;
    let pages = parseInt(pagesInput.value);
    let read = document.getElementById("status").value;
    
    // create book if all fields are filled
    if(title && author && pages) {
        new Book(title, author, pages, read);
        titleInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
        read = "Not read";
        sortTable();
    }
    (!title) ? titleInput.classList.add('error') : titleInput.classList.remove('error');
    (!author) ? authorInput.classList.add('error') : authorInput.classList.remove('error');
    (!pages) ? pagesInput.classList.add('error') : pagesInput.classList.remove('error');
}

new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'Finished');
new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 452, 'Reading');
new Book('The Two Towers', 'J.R.R. Tolkien', 632, 'Not read');
new Book('The Return of the King', 'J.R.R. Tolkien', 345, 'Not read');
new Book('The Hunger Games', 'Suzanne Collins', 549, 'Not read');
new Book('To Kill a Mockingbird', 'Harper Lee', 254, 'Not read');
new Book('Pride and Prejudice', 'Jane Austen', 709, 'Not read');
new Book('Animal Farm', 'George Orwell', 156, 'Not read');
new Book('Gone with the Wind', 'Margaret Mitchell', 631, 'Not read');
new Book('Memoirs of a Geicha', 'Arthur Golden', 690, 'Not read');
new Book('Alice in Wonderland', 'Lewis Caroll', 254, 'Not read');
new Book('Fahrenheit 451', 'Ray Bradbury', 254, 'Not read');

setTimeout(sortTable, 10);