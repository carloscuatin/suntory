// Gist from https://gist.github.com/elijahmanor/6452535
// matches polyfill
if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;
    proto.matches = proto.matchesSelector ||
        proto.mozMatchesSelector || proto.msMatchesSelector ||
        proto.oMatchesSelector || proto.webkitMatchesSelector;
}

// Gist from https://gist.github.com/paulirish/12fb951a8b893a454b32#gistcomment-1474623
// Delegate event polyfill
Node.prototype.on = window.on = function (name, delegate, fn) {
  if(arguments.length !== 3) {
    return this.addEventListener(name, arguments[1]);
  }

  return this.addEventListener(name, function (e) {
    if(e.target.matches(delegate)){
      return fn.apply(e.target, arguments);
    }
  })
};

Node.prototype.off = window.off = function(name, delegate, fn) {
  return this.removeEventListener(name, fn || delegate);
};
