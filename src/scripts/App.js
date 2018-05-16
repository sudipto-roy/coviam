(function(app){
  app.CoviamTest = function(id, testRes) {
    this.id = id;
    this.currentQues = 0;
    this.testData = testRes;
    this.savedResult = [];
  };
  app.CoviamTest.prototype = {
    renderCurrentQues: function(DOMElements) {
      var tempOption = '';
      DOMElements.currentQues.innerHTML = this.currentQues+1;
      DOMElements.totalQues.innerHTML = this.testData.length;
      DOMElements.questionText.innerHTML = this.testData[this.currentQues].text;
      for(let i = 0, len = this.testData[this.currentQues].options.length; i < len; i++) {
        tempOption += `<label class="option-label"><input type="radio" name="option-${this.currentQues}" value="${i}">${this.testData[this.currentQues].options[i]}</label>`;
      }
      DOMElements.options.innerHTML = tempOption;
      DOMElements.nextQuestion.setAttribute('disabled', 'disabled');
    },

    renderNextQues: function(DOMElements) {
      this.saveResult();
      this.currentQues++;
      this.currentQues < this.testData.length ? this.renderCurrentQues(DOMElements) : this.renderResult(DOMElements);
    },

    renderResult: function(DOMElements) {
      var tempResult = `<table class="test-result"><caption>Test #${this.id}</caption>`;
      tempResult+= `<thead><tr><th>#</th><th>Correct Answer</th><th>Your Answer</th></tr></thead>`;
      tempResult += `<tbody>`;
      for(let i = 0, len = this.testData.length; i < len; i++) {
        let correctOpt = this.testData[i].options[this.testData[i].answer],
            selectedOpt = this.testData[i].options[this.savedResult[i]];
        tempResult += `<tr><td>#${i+1}</td><td>${correctOpt}</td><td class=${correctOpt == selectedOpt ? 'correct-ans' : 'wrong-ans'}>${selectedOpt}</td></tr>`
      }
      tempResult += `</tbody></table>`;
      tempResult += `<p>Tab Switch Count: ${app.tabSwitchCount}</p>`;
      DOMElements.mainTag.innerHTML = tempResult;
    },

    saveResult: function() {
      this.savedResult.push(document.querySelector(`input[name="option-${this.currentQues}"]:checked`).value);
    }
  };

  app.API = 'https://cdn.rawgit.com/santosh-suresh/39e58e451d724574f3cb/raw/784d83b460d6c0150e338c34713f3a1c2371e20a/assignment.json';
  app.NEW_WINDOW_NAME = 'new-test';
  app.NEW_WINDOW_OPTIONS = 'width=900,height=600';
  app.tabSwitchCount = 0;
})(app = window.app || {});