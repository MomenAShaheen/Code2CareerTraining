function Book(title, author, isRead = false) {
  this.title = title;
  this.author = author;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function() {
  this.isRead = !this.isRead;
};

Book.prototype.describe = function() {
  return `📖 "${this.title}" by ${this.author} [${this.isRead ? 'Read' : 'Unread'}]`;
};

Book.prototype.patternStyle = function() {
  return "Constructor Function Pattern";
};

// Usage
const book2 = new Book("book2", "author2");
console.log(book2.describe());
book2.toggleReadStatus();
console.log(book2.describe());
console.log(book2.patternStyle());