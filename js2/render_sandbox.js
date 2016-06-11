$(function() {
  var tBody    = $('#tBody'); // Input area
  var pHrawOut = $('#pHrawOut'); // Shows raw HTML string; NOT used in the blog app
  var pMarkOut = $('#pMarkOut'); // Shows rendered HTML
  var pJson    = $('#pJson');    // Shows JSON string of object that holds "body"
  var mObj = {}; // Empty object, filled in during JSON string update

  function render() {
    var bodVal = tBody.val(); // Raw article markup
    var m = marked(bodVal); // Convert markup to html

    // Render article preview (rendered HTML)
    pMarkOut.html(m);
    //pMarkout is defined above as the html element with id of pMarkOut, which is a paragraph within the Live markdown output (read-only) section
    //the below line finds all pre and code html elements and runs hljs.highlightBlock on each of them
    pMarkOut.find('pre code').each(function(i, block) {
      //this function is Syntax-highlighting each "block" that is passed in
      //it returns a marked up version of the javascript code the user inputs(I think, couldn't really tell from the source code in highlight.js), which is
      hljs.highlightBlock(block); // Syntax-highlight each code block "in place"
    });

    pHrawOut.text(m); // Draw raw HTML

    // Update JSON article
    //this line sets mObj.articleBody equal to m, so mObj is our empty object created on line 6, m is a variable created on line 10 to hold the html our markup is converted into(this is done by calling a highlight.js method called marked), the object key 'articleBody' doesn't exist yet until we initialize it here and set it equal to m, so now we have an object with one key 'article body' that equals our html. Finally, on line 27 the text of our pJson html element on the page is set equal to a stringified version of our mObj object, which is a JSON object.
    mObj.articleBody = m;
    var jsonStr = pJson.text(JSON.stringify(mObj));
  }

  //Answering questions 6 and 7 from the homework, yes on any keystrock all of the elements on the page are updated because tBody (our markup textArea) has an event listener that runs render (our funtion that updates everything) on the event 'input': the input event fires when an input or textarea is change.
  // Any character change (article editing) updates the live output paragraphs
  tBody.on('input', render);

  render(); // Render once on doc load
});
