class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.available = true;
        this.ratings = [];
    }

    addRating(rating) {
        if (rating >= 1 && rating <= 5 && !this.available) {
            this.ratings.push(rating);
        } else {
            console.log("Неправильний рейтинг або книга ще не повернута.");
        }
    }

    getAverageRating() {
        if (this.ratings.length === 0) return "Без рейтингу";
        const sum = this.ratings.reduce((a, b) => a + b, 0);
        return (sum / this.ratings.length).toFixed(1);
    }

    toggleAvailability() {
        this.available = !this.available;
    }
}


class User {
    constructor(name) {
        this.name = name;
        this.borrowedBooks = [];
    }

    borrowBook(book) {
        if (book.available) {
            book.toggleAvailability();
            this.borrowedBooks.push(book);
            console.log(`${this.name} взяв книгу "${book.title}".`);
        } else {
            console.log(`Книга "${book.title}" недоступна.`);
        }
    }

    returnBook(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index > -1) {
            book.toggleAvailability();
            this.borrowedBooks.splice(index, 1);
            console.log(`${this.name} повернув книгу "${book.title}".`);
        } else {
            console.log(`Книга "${book.title}" не була взята.`);
        }
    }

    rateBook(book, rating) {
        if (this.borrowedBooks.includes(book)) {
            book.addRating(rating);
            console.log(`Ви оцінили книгу "${book.title}" на ${rating}.`);
        } else {
            console.log("Ви не брали цю книгу.");
        }
    }
}


class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    addUser(user) {
        this.users.push(user);
    }

    findBooksByAuthor(author) {
        return this.books.filter(book => book.author === author);
    }

    listAvailableBooks() {
        return this.books.filter(book => book.available);
    }
}


const library = new Library();
const book1 = new Book("Книга 1", "Автор 1", 2001);
const book2 = new Book("Книга 2", "Автор 2", 2005);
const user1 = new User("Користувач 1");
const user2 = new User("Користувач 2");

library.addBook(book1);
library.addBook(book2);
library.addUser(user1);
library.addUser(user2);

user1.borrowBook(book1);
user1.rateBook(book1, 4);
user1.returnBook(book1);
user1.rateBook(book1, 5);

console.log(`Середній рейтинг книги "${book1.title}": ${book1.getAverageRating()}`);
console.log(`Доступні книги: ${library.listAvailableBooks().map(b => b.title).join(", ")}`);
console.log(`Книги автора "Автор 1": ${library.findBooksByAuthor("Автор 1").map(b => b.title).join(", ")}`);
