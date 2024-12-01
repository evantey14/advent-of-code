use std::{fmt, fs, str::FromStr, string::ParseError};

struct Rule {
    destination_start: u64,
    source_start: u64,
    range_length: u64,
}

impl FromStr for Rule {
    type Err = ParseError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let numbers = s.split_whitespace().map(|s| s.parse::<u64>().unwrap()).collect::<Vec<u64>>();
        return Ok(Rule {
            destination_start: numbers[0],
            source_start: numbers[1],
            range_length: numbers[2],
        });
    }
}

impl fmt::Debug for Rule {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(
            f,
            "({}, {}, {})",
            self.destination_start, self.source_start, self.range_length
        )
    }
}

#[derive(Debug)]
struct Map {
    rules: Vec<Rule>,
}

impl Map {
    pub fn apply(&self, seed: u64) -> u64 {
        let mut result = seed;
        for rule in &self.rules {
            if rule.source_start <= seed && seed < rule.source_start + rule.range_length {
                result = rule.destination_start + (result - rule.source_start);
                println!("Rule {:?}: {} -> {}", rule, seed, result);
                break;
            }
        }
        return result;
    }
}

impl FromStr for Map {
    type Err = ParseError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let rules = s
            .lines()
            .skip(1)
            .map(|line| line.parse::<Rule>().unwrap())
            .collect::<Vec<Rule>>();
        return Ok(Map { rules });
    }
}

pub fn main() {
    let input = fs::read_to_string("data/day05/input.txt").unwrap();

    let (seed_str, maps_str) = input.split_once("\n\n").unwrap();

    let seed_str: Vec<&str> = seed_str.strip_prefix("seeds: ").unwrap().split_whitespace().collect();

    let seed_pairs = seed_str
        .chunks(2)
        .map(|s| {
            let start = s[0].parse::<u64>().unwrap();
            let size = s[1].parse::<u64>().unwrap();
            return (start, size);
        })
        .collect::<Vec<(u64, u64)>>();

    println!("Seed Pairs: {:?}", seed_pairs);

    // let mut seeds = Vec::new();
    // for (start, size) in seed_pairs {
    //     for i in 0..size {
    //         seeds.push(start + i);
    //     }
    // }

    // println!("Seeds: {:?}", seeds);

    // map.apply(seed_range)
    /*

    */

    // let maps = maps_str
    //     .split("\n\n")
    //     .map(|s| s.parse::<Map>().unwrap())
    //     .collect::<Vec<Map>>();

    // println!("Maps: {:?}", maps);

    // let locations = seeds
    //     .iter()
    //     .map(|seed| {
    //         let mut result = *seed;
    //         for map in &maps {
    //             result = map.apply(result);
    //         }
    //         return result;
    //     })
    //     .collect::<Vec<u64>>();

    // println!("Seeds: {:?}", seeds);

    // println!("Locations: {:?}", locations);

    // println!("{}", locations.iter().min().unwrap());
}
