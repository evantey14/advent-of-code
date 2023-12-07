use std::fs;

pub fn main() {
    let input = fs::read_to_string("data/day06/input.txt").unwrap();

    let (time_str, dist_str) = input.split_once("\n").unwrap();

    // Part 1

    let times = time_str
        .strip_prefix("Time: ")
        .unwrap()
        .trim()
        .split_whitespace()
        .map(|s| s.parse::<f32>().unwrap())
        .collect::<Vec<f32>>();

    let distances = dist_str
        .strip_prefix("Distance: ")
        .unwrap()
        .trim()
        .split_whitespace()
        .map(|s| s.parse::<f32>().unwrap())
        .collect::<Vec<f32>>();

    println!("Times: {:?}", times);
    println!("Distances: {:?}", distances);

    let solutions: Vec<u32> = times
        .iter()
        .zip(distances.iter())
        .map(|(&t, &d)| {
            let exact_time_low = t / 2.0 - ((t * t) - 4.0 * d).sqrt() / 2.0;
            let exact_time_high = t / 2.0 + ((t * t) - 4.0 * d).sqrt() / 2.0;

            println!("{} {}", exact_time_low, exact_time_high);
            return (exact_time_high - 1.0).ceil() as u32 - (exact_time_low + 1.0).floor() as u32 + 1;
        })
        .collect();
    println!("Solutions: {:?}", solutions);

    println!("{}", solutions.iter().fold(1, |res, x| res * x));

    // Part 2

    let time: f64 = time_str.strip_prefix("Time:").unwrap().replace(" ", "").parse().unwrap();
    let distance: f64 = dist_str.strip_prefix("Distance:").unwrap().replace(" ", "").parse().unwrap();

    println!("{} {}", time, distance);

    let exact_time_low = time / 2.0 - ((time * time) - 4.0 * distance).sqrt() / 2.0;
    let exact_time_high = time / 2.0 + ((time * time) - 4.0 * distance).sqrt() / 2.0;

    println!("{} {}", exact_time_low, exact_time_high);

    let solutions = (exact_time_high - 1.0).ceil() as u64 - (exact_time_low + 1.0).floor() as u64 + 1;

    println!("{}", solutions);
}
