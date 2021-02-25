
function t(input) {
  var result = {},
    attributes = input.split(';');

  for (var i = 0; i < attributes.length; i++) {
      var entry = attributes[i].split(':');
      result[entry.splice(0,1)[0]] = entry.join(':');
  }
  return result
}