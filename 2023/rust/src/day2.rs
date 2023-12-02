use std::fs;

#[derive(Debug, Default)]
struct Round {
    red: u32,
    green: u32,
    blue: u32,
}

impl Round {
    pub fn set_color(&mut self, color: &str, value: u32) {
        match color {
            "red" => self.red = value,
            "green" => self.green = value,
            "blue" => self.blue = value,
            _ => println!("Invalid color {color}"),
        }
    }
}

pub fn main() {
    let file_path = "data/day02/input.txt";
    let input = fs::read_to_string(file_path).expect("Should have been able to read the file");

    let mut valid_games: Vec<u32> = Vec::new();
    let mut products: Vec<u32> = Vec::new();

    for (i, line) in input.lines().enumerate() {
        println!("{line}");

        let round_strings: Vec<&str> = line
            .split(":")
            .last()
            .unwrap()
            .split(";")
            .map(|x| x.trim())
            .collect();

        let mut rounds: Vec<Round> = Vec::new();

        for round_string in round_strings {
            let mut round = Round::default();

            for number_color in round_string.split(",").map(|x| x.trim()) {
                let number: u32 = number_color.split(" ").next().unwrap().parse().unwrap();
                let color = number_color.split(" ").last().unwrap();
                round.set_color(color, number);
            }

            println!("{:?}", round);

            rounds.push(round)
        }

        if rounds
            .iter()
            .any(|round| round.red > 12 || round.green > 13 || round.blue > 14)
        {
            valid_games.push(i as u32 + 1);
        }

        let max_red = rounds.iter().map(|round| round.red).max().unwrap();
        let max_green = rounds.iter().map(|round| round.green).max().unwrap();
        let max_blue = rounds.iter().map(|round| round.blue).max().unwrap();

        products.push(max_red * max_green * max_blue);
    }

    println!("valid games: {:?}", valid_games);
    let game_sum: u32 = valid_games.iter().sum();
    println!("{game_sum}");

    println!("products: {:?}", products);
    let product_sum: u32 = products.iter().sum();
    println!("{product_sum}");
}
