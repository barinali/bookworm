'use strict';

class Store {
  constructor(name) {
    this._storeName = name;

    this.storage = this.get();

    // initialise for storage on localStorage if it doesn't exist
    if (!this.storage) {
      // we need this object for initialising our default store
      // and some default data :)
      var data = {
        books: [
          {
            id: 1,
            author: 'Ali BARIN',
            name: 'Example Book',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          },
          {
            id: 2,
            author: 'Ali BARIN',
            name: 'Example Book #2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }
        ]
      };

      this.set(JSON.stringify(data));
    }
  }

  getModelKey() {
    return this._modelKey || '';
  }

  setModelKey(name) {
    return this._modelKey = name;
  }

  get() {
    let temp = localStorage[this._storeName];
    return temp ? JSON.parse(temp) : undefined;
  }

  set(data) {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }

    localStorage.setItem(this._storeName, data);
  }

  find(query) {
    const items = this.get()[this.getModelKey()];

    return new Promise((resolve, reject) => resolve(items.filter((item) => {
      for (var key in query) {
        if (query[key] !== item[key]) {
          return false;
        }

        return true;
      }
    })));
  }

  getAll() {
    const items = this.get()[this.getModelKey()];

    return new Promise((resolve, reject) => resolve(items));
  }

  save(item) {
    const items = this.get()[this.getModelKey()];

    return new Promise((resolve, reject) => {
      this.getAll().then((books) => {

        if (item.id) {
          // update exists book
          books.forEach((book, index) => {
            if (book.id === item.id) {
              books[index] = item;
            }
          })

        } else {
          // create new book
          item.id = new Date().getTime();
          books.push(item);
        }

        resolve(item);

        this.set(books);
      });
    });
  }
}

window.app = window.app || {};
window.app.Store = Store;
