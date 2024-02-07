// class User {
//   constructor(public id: number, public username: string) {}

//   postArticle(title: string, content: string): void {
//     console.log(`${this.username} 发表了一篇文章： ${title}`);
//   }
// }

// class VIP extends User {
//   constructor(id: number, username: string, public score = 0) {
//     super(id, username);
//   }
//   // 重写（覆盖）父类的方法：标志是，函数参数的个数和类型一致
//   postArticle(title1: string, content1: string): void {
//     console.log(`重写的方法`);
//   }
// }

// const vip = new VIP(1, '蔡徐坤');
// vip.postArticle('标题', '内容');
