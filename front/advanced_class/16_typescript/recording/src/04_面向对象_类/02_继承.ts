// class User {
//   constructor(public id: number, public username: string) {}
//   postArticle(title: string, content: string): void {
//     console.log(`${this.username} 发表了一篇文章： ${title}`);
//   }
// }

// class VIP extends User {
//   constructor(id: number, username: string, public score: number) {
//     super(id, username);
//     // 必须在 super 调用完之后才能调用 this
//     console.log();
//   }
// }

// var vip = new VIP(1, '蔡徐坤', 100);
// console.log('vip', vip);
