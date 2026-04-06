//!1. :::{Call Method}:::
//!Call is a function that helps you change the context of the invoking function. In other words, it helps you replace the value of “this” inside a function with whatever value you want.

//*The call() method calls the function directly and sets this to the first argument passed to the call method and if any other sequences of arguments preceding the first argument are passed to the call method then they are passed as an argument to the function.

//?call() method allows an object to use the method (function) of another object

const person1 = {
  FName: "Satya",
  LName: "Kumar",
  fullName: function (hometown, country) {
    return this.FName + " " + this.LName + " " + hometown + " " + country;
  },
};

const person2 = {
  FName: "Aman",
  LName: "Singh",
};

console.log(person1.fullName.call(person2)); //-> Aman Singh undefined undefined
console.log(person1.fullName.call(person2, "Bhabhua")); //-> Aman Singh Bhabhua undefined
console.log(person1.fullName.call(person2, "Bhabhua", "India")); //-> Aman Singh Bhabhua India

//!2. :::{Apply Method}::: (In this, We pass arguments in array)
console.log(person1.fullName.apply(person2)); //-> Aman Singh undefined undefined
console.log(person1.fullName.apply(person2, ["Bhabhua"])); //-> Aman Singh Bhabhua undefined
console.log(person1.fullName.apply(person2, ["Bhabhua", "India"])); //-> Aman Singh Bhabhua India

//!2. :::{Bind Method}:::
const result = person1.fullName.bind(person2, "Bhabhua", "India"); // return -> [Function: bound fullName]
console.log(result()); //-> Aman Singh Bhabhua India
