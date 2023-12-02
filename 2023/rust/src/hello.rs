pub fn main() {
    println!("Hello");

    let x = 5;
    let y = 10;

    println!("x = {x} and y + 2 = {}", y + 2);

    let s = String::from("hello");
    takes_ownership(s);
    let x = 5;
    makes_copy(x);

    println!("{s}");
    println!("{x}");
}

fn takes_ownership(some_string: String) {
    // some_string comes into scope
    println!("{}", some_string);
}

fn makes_copy(some_integer: i32) {
    // some_integer comes into scope
    println!("{}", some_integer);
}
