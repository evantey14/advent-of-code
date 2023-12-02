use std::fs;

const NUMBER_STRINGS: [&str; 9] = [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
];

pub fn main() {
    let file_path = "data/day01/input.txt";
    let contents = fs::read_to_string(file_path).expect("Should have been able to read the file");

    let lines: Vec<&str> = contents.split("\n").collect();
    let mut numbers: Vec<u32> = Vec::new();

    for line in lines {
        let mut nums_in_line: Vec<u32> = Vec::new();
        for (i, character) in line.chars().enumerate() {
            if character.is_numeric() {
                nums_in_line.push(character.to_digit(10).unwrap());
                continue;
            }
            for (j, &number_string) in NUMBER_STRINGS.iter().enumerate() {
                let start = i;
                let end = i + number_string.len();

                if end < line.len() + 1 && number_string == &line[start..end] {
                    nums_in_line.push(j as u32 + 1 as u32)
                }
            }
        }
        println!("{line} {:?}", nums_in_line);

        let first_number: u32 = nums_in_line[0];
        let last_number: u32 = nums_in_line[nums_in_line.len() - 1];
        let number: u32 = format!("{}{}", first_number, last_number).parse().unwrap();

        println!("{number}");
        numbers.push(number);
    }

    println!("{:?}", numbers);
    let sum: u32 = numbers.iter().sum();
    println!("{sum}");
}
