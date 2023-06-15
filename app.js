const title = document.getElementById("title"),
  author = document.getElementById("author"),
  numPages = document.getElementById("pages"),
  submit = document.getElementById("submit"),
  readBoolean = document.getElementById("readBoolean"),
  books = document.getElementById("books");

let biblioteca = [];

class Book {
  constructor(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;

    this.info = function () {
      let readBoolean;
      read === "NO"
        ? (readBoolean = "not read yet")
        : (readBoolean = "already read");
      return `${title} by ${author}, ${numPages} pages, ${readBoolean}`;
    };
  }
}

submit.addEventListener("click", () => {
  const book1 = new Book(
    title.value,
    author.value,
    numPages.value,
    readBoolean.value
  );

  biblioteca.push(book1);

  biblioteca.forEach((book) => {
    books.innerHTML = book.info();
  });

  console.log(biblioteca.length);
});
