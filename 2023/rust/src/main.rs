mod day1;
mod hello;

use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        hello::main();
        return;
    }

    let day_number = args[1].parse::<i32>().unwrap_or(-1);

    match day_number {
        1 => day1::main(),
        // Add more cases as needed
        _ => println!("Invalid day number."),
    }
}
