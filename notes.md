- 编译 ，rustc 只适合简单的程序

```bash
rustc main.rs
```

- Rust 是预编译语言，可编译完了之后给别人执行
- .pdb 文件里面是调试信息

# cargo

手册网址：https://rustwiki.org/zh-CN/cargo/guide/dependencies.html

- Cargo，安装 rust 的时候就安装了。
- `cargo --version` 查看是否安装成功
- `cargo new 项目名称`
- cargo check ，周期运行检查代码是否可编译
- cargo run
- cargo build --release
- cargo add rand 添加包
- cargo remove

# 问题

- 在 tauri 中



# 学习笔记

- 变量有 shadowing 覆盖![image-20240111233250793](C:\Users\Wang\AppData\Roaming\Typora\typora-user-images\image-20240111233250793.png)

- 数据类型：Rust 是静态便于语言，编译时必须知道所有变量的类型。
  - 标量类型：一个标量类型代表一个单个的类型
    - 整数类型：
      - 没有小数部分，例如 u32无符号类型，占据32位空间  
      - 无符号证书类型：以u开头的
      - 有符号整数类型i开头
      - ![image-20240111234105968](C:\Users\Wang\AppData\Roaming\Typora\typora-user-images\image-20240111234105968.png)
      - ![image-20240111234439275](C:\Users\Wang\AppData\Roaming\Typora\typora-user-images\image-20240111234439275.png)
    - 浮点类型
    - 布尔类型
    - 字符类型
  
  - rust 传递 json：r#
  
  - \#[derive(Debug)] 在接口体前显示声明，用于输出打印
  
  -   // `:#?` 有换行,   ` :?` 没有换行
  
      `println!("{:#?}", args);`
  
  - :: 符号
  
    - 关联函数
    - 模块创建的命名空间  
  
  - vector 
  
    - ```
      use std::fs::File;
      use std::io::Write;
      
      let s1: String = format!("{:#?}", data);
      println!("{}",s1);
      let mut file = File::create("output111.txt").expect("123");
      file.write_all(s1.as_bytes()).expect("123");
      ```
  
    - docx_rust 是修复过的
    
    - ```
      File::create("_docx_rs之前的.txt");
      ```
    
      这里的路径前不能有_，不然tauri 的窗口会不断重启
    
    - ```
      use base64::{
          alphabet,
          engine::{self, general_purpose},
          Engine as _,
      };
      // https://docs.rs/base64/latest/base64/engine/trait.Engine.html#method.decode
      
      let file_bytes = general_purpose::STANDARD.decode(file_content).unwrap();
      println!("{:?}", file_bytes);
      let mut file = File::create(file_name).expect("创建文件失败");
      file.write_all(&file_bytes).expect("写入文件失败");
      ```
    
    - tauri 老是重启，https://github.com/lzdyes/tauri-plugin-sqlite/issues/9
    
    - 这里是问题： https://zhuanlan.zhihu.com/p/570528555
    
    - ![image-20240113205824351](C:\Users\Wang\AppData\Roaming\Typora\typora-user-images\image-20240113205824351.png)



- 默认打包是英文的，在这里改成中文的。![image-20240114010849197](C:\Users\Wang\AppData\Roaming\Typora\typora-user-images\image-20240114010849197.png)

- 修改名字
- ![image-20240114112447743](C:\Users\Wang\AppData\Roaming\Typora\typora-user-images\image-20240114112447743.png)

- [**Tauri** 是一个应用程序构建工具包，它允许您使用 Web 技术为所有主要的桌面操作系统构建软件](https://tauri.app/zh-cn/v1/guides/getting-started/setup/)[1](https://tauri.app/zh-cn/v1/guides/getting-started/setup/). 如果您想上架一个 Tauri 应用，您需要了解一些关于 Tauri 的知识。那么，让我们来探讨一下 **$schema** 是什么。

  [在 Tauri 中，**$schema** 是一个配置对象，它从一个文件中读取。您可以在此文件中定义前端资源、配置捆绑器、启用应用程序更新、定义系统托盘、通过白名单启用 API 等。这个配置文件由位于 Tauri 应用程序源目录（src-tauri）中的 `tauri init` 命令生成](https://tauri.app/zh-cn/v1/api/config/)[2](https://tauri.app/zh-cn/v1/api/config/)。

  总之，**$schema** 是 Tauri 配置的一部分，用于定义应用程序的各种设置和选项。如果您正在构建 Tauri 应用，您可以在配置文件中找到有关如何定制您的应用的详细信息。

- ![image-20240114145224227](C:\Users\Wang\AppData\Roaming\Typora\typora-user-images\image-20240114145224227.png)

- ```rust
  // let s1 = String::from("recently_file_");
  // let s2: String = String::from("_.json");
  // let rec_file_name = format!("{}{}{}", s1, file_name, s2);
  ```

- File::create 并不能帮你创建不存在的文件夹

- vscode 格式化 xml 可能会把 w: 给删掉，注意一下
