use std::{cmp::Ordering, collections::HashMap, fs, str::FromStr, string::ParseError};

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord)]
enum HandType {
    HighCard,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind,
}

#[derive(Debug)]
struct Hand {
    cards: String,
    bid: u64,
    hand_type: HandType,
}

const CARD_ORDER: &str = "J23456789TQKA";

fn get_hand_type(s: &String) -> HandType {
    let frequencies = s.chars().fold(HashMap::new(), |mut map, val| {
        map.entry(val).and_modify(|frq| *frq += 1).or_insert(1);
        map
    });

    let j_freq = frequencies.get(&'J').unwrap_or(&0);

    let mut highest_freq = 0;
    let mut second_highest_freq = 0;

    for (&char, &freq) in &frequencies {
        if char == 'J' {
            continue;
        }
        if freq > highest_freq {
            second_highest_freq = highest_freq;
            highest_freq = freq;
        } else if freq > second_highest_freq {
            second_highest_freq = freq;
        }
    }

    println!("{} {} {} {}", s, j_freq, highest_freq, second_highest_freq);
    match (highest_freq + j_freq, second_highest_freq) {
        (5, 0) => return HandType::FiveOfAKind,
        (4, 1) => return HandType::FourOfAKind,
        (3, 2) => return HandType::FullHouse,
        (3, 1) => return HandType::ThreeOfAKind,
        (2, 2) => return HandType::TwoPair,
        (2, 1) => return HandType::OnePair,
        _ => return HandType::HighCard,
    }
}

impl FromStr for Hand {
    type Err = ParseError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let (cards_raw, bid) = s.split_once(" ").unwrap();
        let cards = cards_raw.to_string();
        let hand_type = get_hand_type(&cards);

        return Ok(Hand {
            cards,
            bid: bid.parse::<u64>().unwrap(),
            hand_type: hand_type,
        });
    }
}

pub fn main() {
    let input = fs::read_to_string("data/day07/input.txt").unwrap();
    let mut hands: Vec<Hand> = input.lines().map(|line| line.parse().unwrap()).collect();

    println!("{:?}", hands);

    hands.sort_by(|a, b| {
        if a.hand_type != b.hand_type {
            return a.hand_type.cmp(&b.hand_type);
        } else {
            for (a_card, b_card) in a.cards.chars().zip(b.cards.chars()) {
                if a_card != b_card {
                    let a_index = CARD_ORDER.find(a_card).unwrap();
                    let b_index = CARD_ORDER.find(b_card).unwrap();
                    return a_index.cmp(&b_index);
                }
            }
        }
        return Ordering::Equal;
    });

    let mut product = 0;

    for (i, hand) in hands.iter().enumerate() {
        println!("{:?}", hand);
        product += hand.bid * (i as u64 + 1);
    }
    println!("{}", product);
}
