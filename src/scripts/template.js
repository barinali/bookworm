'use strict';

class Template {
  constructor() {
    return 1;
  }

  getBook({ id, name, author, description }) {
    return `
        <article data-id="${id}" class="book--item">
          <header class="book__header">
            <h2 class="book__name">${name}</h2>

            <span class="book__author">${author}</span>
          </header>

          <p class="book__description">
            ${description}
          </p>

          <footer class="book__footer">
            <a href="javascript:;" class="book__button book__button--delete">Delete</a>
            <a href="javascript:;" class="book__button book__button--edit">Edit</a>
          </footer>
        </article>
      `
  }

  getEditableBook({ id, name, author, description} = { id: null, name: 'Enter the name', author: 'Enter name of Author', description: 'Enter description about the book'}) {
    return `
        <article data-id="${id}" class="book--item">
          <header class="book__header">
            <h2 class="book__name" contenteditable>${name}</h2>

            <span class="book__author" contenteditable>${author}</span>
          </header>

          <p class="book__description" contenteditable>
            ${description}
          </p>

          <footer class="book__footer">
            <a href="javascript:;" class="book__button book__button--save">Apply</a>
          </footer>
        </article>
      `
  }
}

window.app = window.app || {};
window.app.Template = Template;
