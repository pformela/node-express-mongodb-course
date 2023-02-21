const fs = require("fs");

fs.readFile("text-file.txt", () => {
  console.log("i/o finished");

  setTimeout(() => console.log("Timer 1 finished"), 0);
  setImmediate(() => console.log("Immediate 1 finished"));
});

console.log("hello from top level code");
