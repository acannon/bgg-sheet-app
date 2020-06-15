function bgg_import() {
  // get collection where date added >= Last Updated (cell B1)
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var last_updated = Utilities.formatDate(new Date(sheet.getRange('B1').getValues()), 'America/Los_Angeles', 'yy-MM-dd');
  var user = sheet.getRange('D1').getValues();
  Logger.log(last_updated);
  
  get_collection(sheet, user, last_updated);
  
  // make color red for "not checked"
  
  // @TODO: user must check results; if corrections are needed, update ID and run "update by ID"
}

// get collection based on username and date last updated
function get_collection(sheet, user, last_updated) {
  
  // get collection XML
  var collection_url = 'http://www.boardgamegeek.com/xmlapi/collection/' + user + '?own=1&modifiedsince=' + last_updated;
  Logger.log(collection_url);
  var response = UrlFetchApp.fetch(collection_url, {'muteHttpExceptions': true});
  
  var xml = response.getContentText();
  var doc = XmlService.parse(xml);
  var collection = doc.getRootElement().getChildren();
  
  // parse fields from XML
  // eventually loop to parse all items returned
  var id, title, rating, time, id_link, players, subdomains, categories, mechanics;
  
  for(var i = 0; i < collection.length; i++) {
    id = collection[i].getAttribute('objectid').getValue();
    title = collection[i].getChild('name').getText();
    rating = collection[i].getChild('stats').getChild('rating').getChild('average').getAttribute('value').getValue();
    time = collection[i].getChild('stats').getAttribute('playingtime').getValue();
    id_link = '=HYPERLINK("https://boardgamegeek.com/boardgame/' + id + '","' + id + '")';
    
    var game_details = get_game_details(id);
    
    Logger.log("game details: " + game_details);
    
    //players = get_players(game_details);
    //subdomains = get_subdomains(game_details);
    //categories = get_categories(game_details);
    //mechanics = get_mechanics(game_details);
    
    sheet.appendRow([id_link, title, rating, time]);
  }
  
}

// get XML of game details
function get_game_details(id) {
  var game_url = 'http://www.boardgamegeek.com/xmlapi/boardgame/' + id;
  var response = UrlFetchApp.fetch(game_url, {'muteHttpExceptions': true});
  
  var xml = response.getContentText();
  var doc = XmlService.parse(xml);
  return doc.getRootElement().getChild('boardgame');
  
}

// get 'best with' player count
function get_players(game_details) {
  
}

// get 'best with' player count
function get_subdomains(game_details) {
  
}

// get 'best with' player count
function get_categories(game_details) {
  
}

// get 'best with' player count
function get_mechanics(game_details) {
  
}
























