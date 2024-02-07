// class User {
//   constructor(
//     readonly id: number, // 可以访问，但是一旦确定不能修改
//     protected username: string, // 可以访问，但是不能外部修改
//     private _password: string // 外部包括子类不能访问，也不可修改
//   ) {}
//   get password() {
//     console.log('寄存器：修改读方法');
//     return '****';
//   }
//   set password(a) {
//     console.log('寄存器：修改写方法');
//     this._password = a;
//     console.log('this._password:>>', this._password);
//   }
// }
// const user = new User(1, '蔡徐坤', '123456');
// console.log(user.password);
// user.password = '1';
