'use strict';

class BookModel extends Store{
  constructor(...args) {
    super();

    this.setModelKey('books');
  }

  set(data) {
    if (typeof data === 'object') {
      data = JSON.stringify({ books: data });
    }

    localStorage.setItem(this._storeName, data);
  }

  read(query) {
    const queryType = typeof query;

    if (queryType === 'number') {
      return this.find({ id: query });
    } else if (queryType === 'undefined') {
      return this.getAll();
    } else {
      return this.find(query);
    }
  }

  delete(id) {
    const self = this;

    this.getAll().then((books) => {
      books = books.filter((book) =>book.id !== id);

      self.set(books);
    })
  }
}

window.app = window.app || {};
window.app.BookModel = BookModel;
