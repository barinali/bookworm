'use strict';

class View {
  constructor(template) {
    this.$view = document.querySelector('#view');
    this.template = template;

    this.$view.innerHTML = template;

    // noob function as default value
    this.onload = () => {};
  }

  onload(handlerFunction) {
    return this.load = handlerFunction;
  }

  showBooks(books) {
    const self = this;

    books = books.reverse().map((book) => {
      return self.template.getBook(book);
    }).join('');

    this.$view.innerHTML = books;

    this.onload();
  }

  addEditableBook() {
    const self = this;

    this.$view.innerHTML = this.template.getEditableBook() + this.$view.innerHTML;
  }

  getEditableBook(data) {
    return this.template.getEditableBook(data);
  }

  updateBook(book, node = null) {
    var existsBookNode = node || document.querySelector(`[data-id="${book.id}"]`);
    var updatedBookNode = document.createElement('div');
    updatedBookNode.innerHTML = this.template.getBook(book);
    updatedBookNode = updatedBookNode.children[0];

    existsBookNode.parentNode.replaceChild(updatedBookNode, existsBookNode);
  }

  removeBook(node) {
    this.$view.removeChild(node);
  }

  bind(eventName, handlerFunction = function() {}) {
    if (eventName === 'addBook') {
      Array.prototype.forEach.call(document.querySelectorAll('.add-book'), (item) => {
        item.addEventListener('click', handlerFunction);
      });
    } else if (eventName === 'saveBook') {
      Array.prototype.forEach.call(document.querySelectorAll('.book__button--save'), (item) => {
        item.onclick = handlerFunction;
      });
    } else if (eventName === 'editBook') {
      Array.prototype.forEach.call(document.querySelectorAll('.book__button--edit'), (item) => {
        item.onclick = handlerFunction;
      });
    } else if (eventName === 'deleteBook') {
      Array.prototype.forEach.call(document.querySelectorAll('.book__button--delete'), (item) => {
        item.onclick = handlerFunction;
      });
    }
  }
}

window.app = window.app || {};
window.app.View = View;
