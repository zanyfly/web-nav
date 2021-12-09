// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $sitelist = $('.sitelist');
var jsonstring = localStorage.getItem('list');
console.log(jsonstring);
var list = JSON.parse(jsonstring) || [{
  logo: 'A',
  link: 'https://www.acfun.cn/',
  name: "acfun"
}, {
  logo: 'B',
  link: 'https://www.bilibili.com/',
  name: 'bilibili'
}];

var urlPath = function urlPath(urlString) {
  if (urlString.length == 0) {
    return "EMPTY";
  }

  var url = new URL(urlString);
  return url.host.split('.').slice(0, -1).join('.');
};

var updateList = function updateList() {
  $sitelist.find('li:not(.last)').remove();
  list.forEach(function (item, index) {
    var $li = $("\n        <li>\n            <div class=\"site\">\n                <div class=\"logo\">".concat(item.logo || "", "\n                </div>\n                <div class=\"link\">").concat(item.name || "", "</div>\n                <div class=\"delete\">              \n                    <svg class=\"icon\" aria-hidden=\"true\">\n                        <use xlink:href=\"#icon-delete\"></use>\n                    </svg>\n                </div>\n            </div>\n    </li>\n        "));
    $('.last').before($li);
    $li.on('click', function () {
      window.open(item.link);
    });
    $li.on('click', '.delete', function (e) {
      e.stopPropagation();
      list.splice(index, 1);
      updateList();
    });
  });
};

updateList();
$('.addbutton').click(function () {
  var urlString = window.prompt('input the website ');

  if (urlString.indexOf('http') !== 0) {
    urlString = 'https://' + urlString;
  }

  list.push({
    logo: urlPath(urlString)[0].toUpperCase(),
    link: urlString,
    name: urlPath(urlString)
  });
  updateList();
});

window.onbeforeunload = function () {
  var jsonstring = JSON.stringify(list);
  localStorage.setItem('list', jsonstring);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.eff4fbe1.js.map