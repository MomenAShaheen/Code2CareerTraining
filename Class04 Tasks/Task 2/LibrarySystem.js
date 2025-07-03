class LibraryItem {
    constructor(title) {
        this._title = title;
        this._checkedOut = false;
    }

    checkOut() {
        this._checkedOut = true;
    }

    returnItem() {
        this._checkedOut = false;
    }

    getStatus() {
        return this._checkedOut ? "Checked out" : "Available";
    }

    getTitle() {
        return this._title;
    }
}

class Book extends LibraryItem {
    constructor(title, author, isbn, pages) {
        super(title);
        this._author = author;
        this._isbn = isbn;
        this._pages = pages;
    }

    getAuthor() {
        return this._author;
    }

    getIsbn() {
        return this._isbn;
    }

    getPages() {
        return this._pages;
    }

    getStatus() {
        return `${super.getStatus()} - ${this._author}, ${this._pages} pages`;
    }
}

// Example usage with generic book names
const book1 = new Book("Book1", "Author1", "ISBN-001", 150);
const book2 = new Book("Book2", "Author2", "ISBN-002", 200);

console.log("Initial status:");
console.log(book1.getStatus());  // "Available - Author1, 150 pages"
console.log(book2.getStatus());  // "Available - Author2, 200 pages"

// Check out both books
book1.checkOut();
book2.checkOut();

console.log("\nAfter checking out:");
console.log(book1.getStatus());  // "Checked out - Author1, 150 pages"
console.log(book2.getStatus());  // "Checked out - Author2, 200 pages"

// Return book1
book1.returnItem();

console.log("\nAfter returning book1:");
console.log(book1.getStatus());  // "Available - Author1, 150 pages"
console.log(book2.getStatus());  // "Checked out - Author2, 200 pages"