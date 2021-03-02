// 前
function* foo() {
  yield 'a';
  yield 'b';
}

// 后
"use strict";

var _marked = /*#__PURE__*/ regeneratorRuntime.mark(foo);

function foo() {
  return regeneratorRuntime.wrap(function foo$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          _context.next = 2;
          return "a";

        case 2:
          _context.next = 4;
          return "b";

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}


// regeneratorRuntime.wrap
function generator(cb) {
  const context = {
    next: 0,
    prev: 0,
    stop: function() {
      // return undefind
    }
  }


  return {
    next: function() {
      let ret = cb(context)
      if (ret === undefined) {
        return { value: undefined, done: true };
      }
      return {
        value: ret,
        done: false
      }
    }
  }
}

function foo() {
  return generator(function foo$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          _context.next = 2;
          return "a";

        case 2:
          _context.next = 4;
          return "b";

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}