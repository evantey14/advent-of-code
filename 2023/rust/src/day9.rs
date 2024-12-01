use std::fs;

pub fn main() {
    let input = fs::read_to_string("data/day09/example.txt").unwrap();

    let sequences: Vec<Vec<i64>> = input
        .lines()
        .map(|line| {
            line.split_whitespace()
                .map(|n| n.parse::<i64>().unwrap())
                .collect::<Vec<i64>>()
        })
        .collect();

    println!("{:?}", sequences);

    for sequence in sequences {
        
    }
}
