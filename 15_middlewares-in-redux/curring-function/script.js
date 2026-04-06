// function multiply(x, y, z) {
//   return x * y * z;
// }

// multiply(2, 3, 5);

//! Curring Fun:- Currying is a technique where a function takes one argument at a time and returns another function until all arguments are received.

/* //? 1st
function multiply(x) {
  return function (y) {
    return function (z) {
      return x + y + z;
    };
  };
}
multiply(2)(3)(4);
*/

/* //? 2nd
function multiply(x) {
  return function (y) {
    if (y) return multiply(x * y);
    return x;
  };
}

multiply(1)(2)(3)(4)(5)();
*/

/* //? Curring Function
function multiplyByN(x) {
  return function (y) {
    return x * y;
  };
}

const multiplyByFour = multiplyByN(4);
console.log(multiplyByFour(5));
console.dir(multiplyByFour);

*/

//? Bind Function
function multiply(a, b) {
  return a * b;
}

const mutliplyByRwo = multiply.bind(this, 2);

console.log(mutliplyByRwo(5)); // -> 5
