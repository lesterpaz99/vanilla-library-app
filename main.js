const myLibrary = [{
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    pages: 180,
    read: true,
    id: 1
}, {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    pages: 281,
    read: false,
    id: 2
}];

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

const hideFormSection = () => {
    const formSection = document.querySelector('#add-book-form-section');
    formSection.classList.toggle('hidden');
}

const addBookToLibrary = (event) => {
    const title = event.target.title.value;
    const author = event.target.author.value;
    const pages = event.target.pages.value;
    const read = event.target.read.checked;
    const id = myLibrary.length + 1;

    const newBook = new Book(title, author, pages, read, id);
    myLibrary.unshift(newBook);

    event.target.reset();

    hideFormSection();
    displayBooks(newBook);
    event.preventDefault();
}

const form = document.querySelector('#book-form');
form.addEventListener('submit', addBookToLibrary);

const addBookBtn = document.querySelector('#add-book-btn');
addBookBtn.addEventListener('click', hideFormSection);


const bookList = document.querySelector('#book-list');

const displayBooks = book => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');

    const title = document.createElement('p');
    title.textContent = `Title: ${book.title}`;
    bookInfo.append(title);

    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;
    bookInfo.append(author);

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.pages}`;
    bookInfo.append(pages);

    const status = document.createElement('p');
    status.textContent = `Status: ${book.read ? 'Read' : 'Not Read'}`;
    bookInfo.append(status);

    bookCard.append(bookInfo);

    const bookButtons = document.createElement('div');
    bookButtons.classList.add('book-buttons');

    const updateStatusBtn = document.createElement('button');
    updateStatusBtn.classList.add('toggle-read-btn');
    updateStatusBtn.textContent = 'Change Read Status';

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';

    bookButtons.append(updateStatusBtn, removeBtn);
    bookCard.append(bookButtons);
    bookList.append(bookCard);

    updateStatusBtn.addEventListener('click', () => {
        book.read = !book.read;
        status.textContent = `Status: ${book.read ? 'Read' : 'Not Read'}`;
    });

    removeBtn.addEventListener('click', () => {
        bookList.removeChild(bookCard);
        const bookIndex = myLibrary.findIndex(b => b.id === book.id);
        myLibrary.splice(bookIndex, 1);
    });
}

// Display books
myLibrary.forEach(displayBooks);