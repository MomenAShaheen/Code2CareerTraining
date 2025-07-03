const BookSingleton = (function() {
  let instance;
  
  function createInstance(title, author, isRead = false) {
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
        return "Singleton Pattern";
      }
    };
  }

  return {
    getInstance: function(title, author, isRead) {
      if (!instance) {
        instance = createInstance(title, author, isRead);
      }
      return instance;
    }
  };
})();

// Usage
const book4 = BookSingleton.getInstance("book4", "author4");
console.log(book4.describe());
book4.toggleReadStatus();
console.log(book4.describe());
console.log(book4.patternStyle());

// This will return the same instance
const anotherBook = BookSingleton.getInstance("newbook", "newauthor");
console.log(anotherBook.describe()); // Still shows book4/author4