$(function() {
  var tBody    = $('#text-area'); // Input area
  var markdownOutput = $('#live-markdown'); // Shows rendered HTML
  var markButton = $('#markButton');

  function render() {
    var bodVal = tBody.val(); // Raw article markup
    var m = marked(bodVal); // Convert markup to html

    markdownOutput.html(m);

    markdownOutput.find('pre code').each(function(i, block) {

      hljs.highlightBlock(block); // Syntax-highlight each code block "in place"
    });
  }

  tBody.on('input', render);
  // markButton.on('click', render);

  render(); // Render once on doc load
});
