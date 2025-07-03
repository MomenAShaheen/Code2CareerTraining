function createBook(title, author, isRead = false) {
  return {
    title,
    author,
    isRead,
    toggleReadStatus() {
      this.isRead = !this.isRead;
    },
    describe() {
      return `📖 "${this.title}" by ${this.author} [${this.isRead ? 'Read' : 'Unread'}]`;
    },
    patternStyle() {
      return "Factory Function Pattern";
    }
  };
}

// Usage
const book1 = createBook("book1", "author1");
console.log(book1.describe());
book1.toggleReadStatus();
console.log(book1.describe());
console.log(book1.patternStyle());