use std::{fs, str::FromStr, string::ParseError};

#[derive(Debug)]
struct Card {
    winning_numbers: Vec<u32>,
    your_numbers: Vec<u32>,
}

impl FromStr for Card {
    type Err = ParseError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let (winning_str, your_str) = s.split_once(": ").unwrap().1.split_once("| ").unwrap();
        println!("{winning_str} {your_str}");

        Ok(Card {
            winning_numbers: winning_str.split_whitespace().map(|s| s.parse::<u32>().unwrap()).collect(),
            your_numbers: your_str.split_whitespace().map(|s| s.parse::<u32>().unwrap()).collect(),
        })
    }
}

pub fn main() {
    let input = fs::read_to_string("data/day04/input.txt").unwrap();

    let cards: Vec<Card> = input.lines().map(|line| line.parse().unwrap()).collect();

    println!("Cards: {:?}", cards);

    let mut sum = 0;
    let mut number_of_copies = vec![1; cards.len()];
    println!("Number of copies: {:?}", number_of_copies);

    for (i, card) in cards.iter().enumerate() {
        println!("Card: {i}");
        let your_winning_numbers: Vec<&u32> = card
            .winning_numbers
            .iter()
            .filter(|&n| card.your_numbers.contains(&n))
            .collect();
        println!(
            "Your winning numbers: {:?} ({})",
            your_winning_numbers,
            your_winning_numbers.len()
        );

        if your_winning_numbers.len() > 0 {
            sum += u32::pow(2, your_winning_numbers.len() as u32 - 1);

            for j in 1..your_winning_numbers.len() + 1 {
                // println!("card: {}", i + j);
                if i + j > cards.len() - 1 {
                    break;
                }
                number_of_copies[i + j] += number_of_copies[i];
            }
            println!("Number of copies: {:?}", number_of_copies);
        }
    }

    println!("Sum: {}", sum);

    let total_number_of_copies = number_of_copies.iter().sum::<u32>();
    println!("Number of copies: {}", total_number_of_copies);
}
