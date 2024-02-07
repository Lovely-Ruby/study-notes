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
//   // 重载：参数个数，参数类型不同：
//   postArticle(title: string, content: string): void;
//   postArticle(title: string, content: string, file: string): void;
//   postArticle(title: string, content: string, file?: string): void {
//     super.postArticle(title, content);
//     console.log('函数的重载');
//     if (file) {
//       this.postAttachment(file);
//     }
//   }
//   postAttachment(file: string): void {
//     console.log(`${this.username} 上传了一个附件： ${file}`);
//   }
// }

// // 具体使用场景
// const vip = new VIP(1, '大帅逼');
// vip.postArticle('标题', '内容');
// vip.postArticle('标题1', '内容1', '1.png');
