use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("猜数游戏！");
    let secret_number = rand::thread_rng().gen_range(1..101);
    println!("神秘数字是：{}", secret_number);
    loop {
        println!("请输入你要猜的数字：");
        let mut guess = String::new();
        io::stdin().read_line(&mut guess).expect("错误");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };
        match guess.cmp(&secret_number) {
            Ordering::Less => {
                println!("too small")
            }
            Ordering::Greater => {
                println!("too big")
            }
            Ordering::Equal => {
                println!("you win");
                break;
            }
        }
    }
}
