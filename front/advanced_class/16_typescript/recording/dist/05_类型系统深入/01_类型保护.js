// function fn(a: string | number) {
//   (<string>a).substring(1, 2);
//   if (typeof a === 'string') {
//     a.substring(1, 2);
//   } else {
//     a.toFixed(1);
//   }
// }
function fn(a) {
    if (a instanceof Array) {
        a.push(1);
    }
    else {
        a.getFullYear();
    }
}
