'use strict';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.onload = this.bindEvents.bind(this);
  }

  setView(page) {
    const self = this;
    const pages = {
      showBooks: self.showBooks
    };
  }

  showBooks() {
    const self = this;
    const books = this.model.getAll();

    books.then(function(booksArray) {
      self.view.showBooks(booksArray);
    })
  }

  addBook() {

  }

  // @returns Promise
  getBookData(id) {
    if (typeof id === 'string') {
      id = parseInt(id);
    }

    return this.model.read(id);
  }

  parseData(node) {
    let book = {
      name: node.querySelector('.book__name').innerHTML.trim(),
      author: node.querySelector('.book__author').innerHTML.trim(),
      description: node.querySelector('.book__description').innerHTML.trim()
    };

    if (typeof node.dataset.id !== 'undefined') {
      book.id = parseInt(node.dataset.id);
    }

    return book;
  }

  editBookEventBind() {
    const self = this;

    this.view.bind('editBook', (event) => {
      event.preventDefault();

      const buttonElement = event.target;
      let bookElement = $closest(buttonElement, 'book--item');
      const bookId = bookElement.dataset.id;
      const bookData = self.getBookData(bookId)

      bookData.then(function(data) {
        const originalBookData = data[0];
        const editableBook = self.view.getEditableBook(originalBookData);
        let newBookElement = document.createElement('div');

        newBookElement.innerHTML = editableBook;
        newBookElement = newBookElement.children[0];

        bookElement.parentNode.replaceChild(newBookElement, bookElement);

        self.view.bind('saveBook', (event) => {
          event.preventDefault();

          bookElement = $closest(event.target, 'book--item');

          const updatedBookData = self.parseData(bookElement);

          self.view.updateBook(updatedBookData);

          self.model.save(updatedBookData);

          self.attachLiveEvents();
        });
      });
    });
  }

  deleteBookEventBind() {
    const self = this;

    this.view.bind('deleteBook', (event) => {
      event.preventDefault();

      const buttonElement = event.target;
      let bookElement = $closest(buttonElement, 'book--item');
      const bookId = parseInt(bookElement.dataset.id);

      self.model.delete(bookId);
      self.view.removeBook(bookElement);
    })
  }

  attachLiveEvents() {
    this.editBookEventBind();
    this.deleteBookEventBind();
  }

  bindEvents() {
    const self = this;

    this.view.bind('addBook', (event) => {
      event.preventDefault();

      self.view.addEditableBook();

      self.view.bind('saveBook', (event) => {
        event.preventDefault();

        var bookNode = $closest(event.target, 'book--item');
        var bookData = self.parseData(bookNode);

        self.model.save(bookData).then((book) => {
          self.view.updateBook(book, bookNode);

          self.attachLiveEvents();
        });
      })
    });

    this.attachLiveEvents();
  }
}

window.app = window.app || {};
window.app.Controller = Controller;
