(function(app) {
  var _global = {};
  var initCache = function() {
    _global.DOM = {
      startTest: document.getElementById('startTest')
    }
  };
  var initEvents = function() {
    _global.DOM.startTest.addEventListener('click', _handleStartTestClick);
  };
  var _handleStartTestClick = function(e) {
    e.preventDefault();
    window.open(e.target.getAttribute("href"), app.NEW_WINDOW_NAME, app.NEW_WINDOW_OPTIONS);
  };
  (function() {
    initCache();
    initEvents();
  })();
})(window.app);