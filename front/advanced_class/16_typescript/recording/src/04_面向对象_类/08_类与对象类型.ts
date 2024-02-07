// class Person {
//   // 属于类的
//   static type = '人';

//   // 属于实例的
//   name: string;
//   age: number;
//   gender: string;

//   // 类的构造函数也是属于类的
//   constructor(name: string, age: number, gender: '男' | '女' = '男') {
//     this.name = name;
//     this.age = age;
//     this.gender = gender;
//   }

//   public eat(): void {
//     // ...
//   }
// }

// interface PersonConstructor {
//   // new 表示它是一个构造函数
//   new (name: string, age: number, gender: '男' | '女'): PersonInstance;
//   type: string;
// }

// let p1 = new Person('zMouse', 35, '男');
// p1.eat();
// Person.type;
