document.addEventListener('DOMContentLoaded', function() {
  var searchButton = document.getElementById('search-button');
  var subredditInput = document.getElementById('subreddit-input');
  searchButton.addEventListener('click', search);
  subredditInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      search();
    }
  });
  function search() {
    var subreddit = subredditInput.value;
    if (subreddit) {
      var url = 'https://www.reddit.com/r/' + subreddit;
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        var activeTab = tabs[0];
        if (activeTab.url === 'chrome://newtab/') {
          chrome.tabs.update(activeTab.id, {url: url}, function() {
            window.close();
          });
        } else {
          chrome.tabs.create({url: url}, function() {
            window.close();
          });
        }
      });
    }
  }
});
