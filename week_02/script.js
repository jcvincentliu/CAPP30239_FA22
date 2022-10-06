// to comment in-line 

/*
this is a 
block comment
*/

// ; is optional but highly recommended

let num = 100;
function foo() {   //creat a function
    console.log(num);
};

foo();

// can not console.log a variable defined inside a function in the outside (must be put on a global-scale level)

/* annoymous function: 
let annonFun = function() {
    console.log("hello");
}
this function won't be called bc console.log is inside. You have to call annonFun() to make the message appears
*/

(function() {   // this funcion will be called; There is no way to call it bc it's anoymnous
    console.log("Hello!");
})();

(() => console.log(100)());    // => = "=" + ">"

let foo2 = () => console.log(num +1); // initially declaing it; nearly identical to lines 18-21
foo2();

foo2 = () => console.log(num*10);  // renaming it (reassigning a value to it)
foo2();

let arr = ["foo", "bar", "zar", 123, ["zar", 123]];  // we can have string, number, sublist
console.log(arr[0]); // indexing starts at 0 

arr[1] = "barbar"; //overwrite the number
console.log(arr[1]);  // you can log the whole array

arr.push("par");  // add an item to the end of array
console.log(arr);

arr.splice(2,1);  // remove an item from array (starting index, delete # of items)
console.log(arr);

// ARRAY
let new_arr = ["metal", "heavy", "eternal"];
for (let item of new_arr) {
    console.log(item);
} // log each item in an array

for (let i in new_arr) {
    console.log(i + "_" + new_arr[i])  // look through each item in their index
};

new_arr.forEach((item,i) => console.log(i + " " + item))  // this is equivalent to above

// OBJECT

let obj1 = {
    name: "Joel",
    age:85,
    job: "Cactus Hunter",  // the "," is optional. both works
}; // defining object
console.log(obj1.name); // accessing an item in the object 

console.log(obj1["age"]);

obj1.job = "Vocalist"; // set value

for (let key in obj1) {
    let value = obj1[key];
    console.log(`${key}: ${value}`);  // string template literal; use {} not () after $
}

// let str = "Hello " + key + "more text here" + foo;
// let str2  = `Hello ${key} more text here ${foo}`;

let fall = 72;
console.log(typeof fall); // to see the type. 

let falll = [72,73];
console.log(typeof falll); // return object even if it's an array

for (let i = 0; i < 10; i++) {
    console.log(i);
};

// 

let val = 80;
if (val >= 80) {
    console.log("Good")
} else if (val >50) {
    console.log("Okay")
} else {
    console.log("Terrible")
}  // if-else if-else

let y = (val >= 80) ? console.log("good") : console.log("not good")  // this is like if-else

let newVar = document.getElementById("example");

newVar.innerHTML += "Hello World" // error shows bc we define script in the header in index.html
// newVar.innerHTML += <div>"Hi, friend"</div>