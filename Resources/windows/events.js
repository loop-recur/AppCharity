module.exports = function() {
  var template = isIPad ? nrequire('/templates/windows/ipad/events') :
                          nrequire('/templates/windows/events');
  return template.render();
};
