(function(app) {
  var _cache = {};

  var initCache = function() {
    _cache.DOM = {
      body : document.querySelector('body'),
      mainTag : document.querySelector('.main-tag'),
      currentQues : document.querySelector('.current-ques'),
      totalQues : document.querySelector('.total-ques'),
      questionText : document.querySelector('.question-text'),
      options : document.querySelector('.options'),
      nextQuestion : document.querySelector('.next-question')
    }
  };

  var initEvents = function() {
    document.addEventListener('DOMContentLoaded', _createTest);
    window.addEventListener('focus', _handleTabSwitch);
    _cache.DOM.body.addEventListener('contextmenu', event => event.preventDefault());
    _cache.DOM.body.addEventListener('keydown', _disableInspectElement);
    _cache.DOM.nextQuestion.addEventListener('click', _handleNextQuesClick);
    _cache.DOM.body.addEventListener('click', _enableNextButton);
  };

  var _createTest = function() {
    var id = (new Date).getTime();
    alert('Your Test ID is '+id+'. Please note the id for future reference.');
    fetch(app.API)
      .then(data => data.json())
      .then(res => {
          _cache.coviamTest = new app.CoviamTest(id, res);
          _cache.coviamTest.renderCurrentQues(_cache.DOM);
      });
  };

  var _handleTabSwitch = function() {
      app.tabSwitchCount++;
  }

  var _handleNextQuesClick = function() {
    _cache.coviamTest.renderNextQues(_cache.DOM);
  };

  var _disableInspectElement = function(event) {
    if (event.keyCode == 123) { // Prevent F12
      event.preventDefault();
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I
      event.preventDefault();
    } else if (event.ctrlKey && event.keyCode == 82) { // Prevent Ctrl+r
      event.preventDefault();
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 82) { // Prevent Ctrl+Shift+r
      event.preventDefault();
    }
  };

  var _enableNextButton = function(e) {
    if(e.target.classList.contains('option-label')) {
      _cache.DOM.nextQuestion.removeAttribute('disabled');
    }
  };

  (function() {
    initCache();
    initEvents();
  })();
})(window.app);