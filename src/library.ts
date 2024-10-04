import { Book, Genre } from "./types";

export class Library {
  private books: Book[] = [];
  private nextId: number = 1;

  addBook(title: string, author: string, genre: Genre, publishedYear: number): void {
    const newBook: Book = {
      id: this.nextId++,
      title,
      author,
      genre,
      publishedYear,
      available: true,
    };
    this.books.push(newBook);
    console.log(`Added new book: ${title}`);
  }

  updateBook(id: number, updatedData: Partial<Book>): void {
    const book = this.books.find(b => b.id === id);
    if (!book) {
      console.log(`Book with ID ${id} not found.`);
      return;
    }
    Object.assign(book, updatedData);
    console.log(`Book with ID ${id} has been updated.`);
  }

  deleteBook(id: number): void {
    this.books = this.books.filter(b => b.id !== id);
    console.log(`Book with ID ${id} has been deleted.`);
  }

  searchBooks(criteria: Partial<Book>): Book[] {
    return this.books.filter(book => {
      return Object.keys(criteria).every(key => {
        return (book as any)[key] === (criteria as any)[key];
      });
    });
  }

  listBooks(): void {
    if (this.books.length === 0) {
      console.log("No books available.");
      return;
    }
    this.books.forEach(book => {
      console.log(`${book.id}: ${book.title} by ${book.author} [${book.genre}]`);
    });
  }
}
