import { Library } from "./library";
import { Genre } from "./types";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const library = new Library();

function mainMenu() {
  console.log("\n--- Book Inventory System ---");
  console.log("1. Add Book");
  console.log("2. Update Book");
  console.log("3. Delete Book");
  console.log("4. Search Books");
  console.log("5. List All Books");
  console.log("6. Exit");

  rl.question("\nSelect an option: ", (option) => {
    switch (option) {
      case "1":
        addBook();
        break;
      case "2":
        updateBook();
        break;
      case "3":
        deleteBook();
        break;
      case "4":
        searchBooks();
        break;
      case "5":
        listBooks();
        break;
      case "6":
        rl.close();
        break;
      default:
        console.log("Invalid option.");
        mainMenu();
    }
  });
}

function addBook() {
  rl.question("Title: ", (title) => {
    rl.question("Author: ", (author) => {
      console.log("Genres: Fiction, Non-Fiction, Mystery, Science Fiction, Biography");
      rl.question("Genre: ", (genreInput) => {
        const genre = Genre[genreInput as keyof typeof Genre];
        rl.question("Published Year: ", (yearInput) => {
          const publishedYear = parseInt(yearInput);
          library.addBook(title, author, genre, publishedYear);
          mainMenu();
        });
      });
    });
  });
}

function updateBook() {
  rl.question("Enter Book ID to update: ", (idInput) => {
    const id = parseInt(idInput);
    rl.question("New Title (leave blank to skip): ", (title) => {
      rl.question("New Author (leave blank to skip): ", (author) => {
        rl.question("New Published Year (leave blank to skip): ", (yearInput) => {
          const updates: any = {};
          if (title) updates.title = title;
          if (author) updates.author = author;
          if (yearInput) updates.publishedYear = parseInt(yearInput);
          library.updateBook(id, updates);
          mainMenu();
        });
      });
    });
  });
}

function deleteBook() {
  rl.question("Enter Book ID to delete: ", (idInput) => {
    const id = parseInt(idInput);
    library.deleteBook(id);
    mainMenu();
  });
}

function searchBooks() {
  rl.question("Search by Title: ", (title) => {
    rl.question("Search by Author: ", (author) => {
      const criteria: any = {};
      if (title) criteria.title = title;
      if (author) criteria.author = author;
      const results = library.searchBooks(criteria);
      if (results.length > 0) {
        results.forEach(book => {
          console.log(`${book.id}: ${book.title} by ${book.author} [${book.genre}]`);
        });
      } else {
        console.log("No books found matching the criteria.");
      }
      mainMenu();
    });
  });
}

function listBooks() {
  library.listBooks();
  mainMenu();
}

mainMenu();
