class Book {
  constructor(title, author, isRead = false) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
  }

  toggleReadStatus() {
    this.isRead = !this.isRead;
  }

  describe() {
    return `📖 "${this.title}" by ${this.author} [${this.isRead ? 'Read' : 'Unread'}]`;
  }

  patternStyle() {
    return "Class Pattern";
  }
}

// Usage
const book3 = new Book("book3", "author3");
console.log(book3.describe());
book3.toggleReadStatus();
console.log(book3.describe());
console.log(book3.patternStyle());