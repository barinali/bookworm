'use strict';

class App {
  constructor(name) {
    this.template = new app.Template();
    this.view = new app.View(this.template);
    this.storage = new app.Store(name);
    this.model = new app.BookModel();
    this.controller = new app.Controller(this.model, this.view);
  }
}

window.app = window.app || {};
window.app.App = App;

window.onload = function() {
  var application = new App('bookworm');

  application.controller.showBooks();
};
