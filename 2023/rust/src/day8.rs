use std::{collections::HashMap, fs};

pub fn main() {
    let input = fs::read_to_string("data/day08/input.txt").unwrap();
    let (steps, nodes_str) = input.split_once("\n\n").unwrap();
    let mut nodes = HashMap::new();
    for node_str in nodes_str.lines() {
        nodes.insert(
            node_str[0..3].to_string(),
            (node_str[7..10].to_string(), node_str[12..15].to_string()),
        );
    }

    println!("{}", steps);
    println!("{:?}", nodes);

    let mut current_nodes: Vec<&String> = nodes.keys().filter(|node| node.ends_with('A')).collect();

    println!("Starting nodes: {:?}", current_nodes);

    let mut rounds = 0;
    while !current_nodes.iter().all(|&node| node.ends_with('Z')) {
        for step in steps.chars() {
            current_nodes = current_nodes
                .iter()
                .map(|&node| {
                    let (left, right) = nodes.get(node).unwrap();
                    match step {
                        'L' => left,
                        'R' => right,
                        _ => panic!("ERROR"),
                    }
                })
                .collect();
        }

        rounds += 1;
        if current_nodes.iter().any(|&node| node.ends_with('Z')) {
            println!("*{:?} {}", current_nodes, rounds * steps.len());
        }
        // Read logs and here were the first Zs for each position:
        // [12083, 18827, 22199, 13207, 20513, 17141]
    }
}
