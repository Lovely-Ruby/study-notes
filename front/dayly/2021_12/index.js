var result = '12345678'.replace(/(?=\d{3}$)/g, ',');
console.log(result);
// => "12345,678"
