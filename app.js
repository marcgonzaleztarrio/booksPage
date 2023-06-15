const title = document.getElementById("title");
const author = document.getElementById("author");
const numPages = document.getElementById("pages");
const submit = document.getElementById("submit");
const read = document.getElementById("readBoolean");
const books = document.getElementById("books");
const check = document.getElementById("check");

let biblioteca = [];

class Book {
  constructor(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.id = Date.now();
  }

  generateHTML() {
    const textRead = this.read ? "already read" : "not read yet";
    return `
      <div class="container">
        <div class="book">
          <div class="front">
            <div class="cover">
              <p class="title">${this.title}</p>
              <p class="pages">№ of pages ${this.numPages}</p>
              <p class="author">by ${this.author}</p>
            </div>
          </div>
          <div class="left-side">
            <div class="prueba">
              <i class="fa-solid fa-check fa-rotate-270 btn-read" style="color: #000000;" id="check"></i>
              <i class="fa-solid fa-trash fa-rotate-270 btn-delete" style="color: #000000;" data-id="${this.id}"></i>
            </div>

            <div class="page-title">

              <div class="joder">
                <span id="author">${book.title}</span>
              </div>

          </div>

          </div>
        </div>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let storedBiblioteca = localStorage.getItem("biblioteca");

  let _lsTotal = 0,
    _xLen,
    _x;
  for (_x in localStorage) {
    if (!localStorage.hasOwnProperty(_x)) {
      continue;
    }
    _xLen = (localStorage[_x].length + _x.length) * 2;
    _lsTotal += _xLen;
    console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB");
  }
  console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");

  let loko = {
    title: "La biblia",
    author: "Satanas",
    numPages: 69696,
    read: false,
    id: Date.now(),
  };
  console.log(loko);

  const numerito = (_lsTotal / 1024).toFixed(2);

  if (numerito <= 0.03) {
    const bookElement = createBookElement(loko);
    books.appendChild(bookElement);
    biblioteca.push(loko);
    saveToLocalStorage();
  } else {
    if (storedBiblioteca) {
      biblioteca = JSON.parse(storedBiblioteca);

      biblioteca.forEach((book) => {
        const bookElement = createBookElement(book);
        books.appendChild(bookElement);
      });
    }
  }
});

submit.addEventListener("click", () => {
  console.log(biblioteca);
  const newBook = new Book(
    title.value,
    author.value,
    numPages.value,
    read.checked
  );
  const bookElement = createBookElement(newBook);
  books.appendChild(bookElement);

  biblioteca.push(newBook);
  saveToLocalStorage();

  title.value = "";
  author.value = "";
  numPages.value = "";
  read.checked = false;
});

books.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-delete")) {
    const deleteBtn = event.target;
    const bookId = deleteBtn.getAttribute("data-id");
    const bookIndex = biblioteca.findIndex(
      (book) => book.id === parseInt(bookId)
    );

    if (bookIndex !== -1) {
      biblioteca.splice(bookIndex, 1);
      saveToLocalStorage();
      deleteBtn.parentNode.parentNode.parentNode.remove();
    }
  }
});

function createBookElement(book) {
  const bookElement = document.createElement("div");
  bookElement.innerHTML = `
    <div class="container">
      <div class="book">
        <div class="front">
          <div class="cover">
            <p class="title">${book.title}</p>
            <p class="pages">№ of pages ${book.numPages}</p>
            <p class="author">by ${book.author}</p>
          </div>
        </div>
        <div class="left-side">
          <div class="prueba">
            <i class="fa-solid fa-check btn-read" style="color: #000000;" id="check"></i>
            <i class="fa-solid fa-trash btn-delete" style="color: #000000;" data-id="${book.id}"></i>
          </div>

        <div class="page-title">
          <div class="joder">
            <span id="author">${book.title}</span>
          </div>
        </div>

        </div>
      </div>
    </div>
  `;

  return bookElement;
}

function saveToLocalStorage() {
  localStorage.setItem("biblioteca", JSON.stringify(biblioteca));
}

// modal

const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
