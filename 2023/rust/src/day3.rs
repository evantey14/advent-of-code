use std::{fs, str::FromStr, string::ParseError};

fn is_in_box(location: &Location, top_left: Location, bottom_right: Location) -> bool {
    location.row >= top_left.row
        && location.row <= bottom_right.row
        && location.col >= top_left.col
        && location.col <= bottom_right.col
}

#[derive(Debug)]
struct Location {
    row: usize,
    col: usize,
}

#[derive(Debug)]
struct PartLocation {
    row: usize,
    start: usize,
    end: usize,
}

#[derive(Debug)]
struct Engine {
    schematic: Vec<Vec<char>>,
    symbol_locations: Vec<Location>,
}

impl Engine {
    pub fn get_part_number(&self, part_location: &PartLocation) -> u32 {
        let s: String = self.schematic[part_location.row][part_location.start..part_location.end + 1]
            .iter()
            .collect();

        return s.parse().unwrap();
    }

    pub fn get_part_locations(&self) -> Vec<PartLocation> {
        let mut part_locations: Vec<PartLocation> = Vec::new();
        for (row_index, row) in self.schematic.iter().enumerate() {
            let mut start = -1;
            for (col_index, &col) in row.iter().enumerate() {
                if col.is_numeric() {
                    if start == -1 {
                        start = col_index as i32;
                    }
                    if start != -1 && col_index == row.len() - 1 {
                        let part_location = PartLocation {
                            row: row_index,
                            start: start as usize,
                            end: col_index,
                        };
                        println!("Found part {:?}", part_location);
                        if self.is_part(&part_location) {
                            println!("Adding part {:?}", part_location);
                            part_locations.push(part_location);
                        }
                        start = -1;
                    }
                } else {
                    if start != -1 {
                        let part_location = PartLocation {
                            row: row_index,
                            start: start as usize,
                            end: col_index - 1,
                        };
                        println!("Found part {:?}", part_location);
                        if self.is_part(&part_location) {
                            println!("Adding part {:?}", part_location);
                            part_locations.push(part_location);
                        }
                        start = -1;
                    }
                };
            }
        }
        part_locations
    }

    fn get_part_box(&self, part_location: &PartLocation) -> (Location, Location) {
        let row = part_location.row;
        let start = part_location.start;
        let end = part_location.end;
        let max_row = self.schematic.len() - 1;
        let max_col = self.schematic[row].len() - 1;

        let top = if row == 0 { 0 } else { row - 1 };
        let left = if start == 0 { 0 } else { start - 1 };
        let right = if end == max_col { max_col } else { end + 1 };
        let bottom = if row == max_row { max_row } else { row + 1 };

        (Location { row: top, col: left }, Location { row: bottom, col: right })
    }

    pub fn is_part(&self, part_location: &PartLocation) -> bool {
        println!("Checking part {:?}", part_location);
        for symbol_location in &self.symbol_locations {
            let (top_left, bottom_right) = self.get_part_box(part_location);

            if is_in_box(symbol_location, top_left, bottom_right) {
                println!("Found symbol {:?} in box {:?}", symbol_location, part_location);
                return true;
            }
        }
        return false;
    }
}

impl FromStr for Engine {
    type Err = ParseError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let schematic: Vec<Vec<char>> = s.lines().map(|line| line.chars().collect()).collect();
        let symbol_locations: Vec<Location> = schematic
            .iter()
            .enumerate()
            .flat_map(|(row_index, row)| {
                row.iter()
                    .enumerate()
                    .filter(|(_, &col)| col != '.' && !col.is_numeric())
                    .map(move |(col_index, _)| Location {
                        row: row_index,
                        col: col_index,
                    })
            })
            .collect();

        Ok(Engine {
            schematic,
            symbol_locations,
        })
    }
}

fn print_engine(engine: &Engine) {
    for row in engine.schematic.iter() {
        for cell in row {
            print!("{}", cell);
        }
        println!();
    }

    for location in engine.symbol_locations.iter() {
        println!("Symbol: {:?} {}", location, engine.schematic[location.row][location.col]);
    }
}

pub fn main() {
    let input = fs::read_to_string("data/day03/input.txt").unwrap();

    let engine: Engine = input.parse().unwrap();
    print_engine(&engine);

    let part_location = PartLocation {
        row: 0,
        start: 5,
        end: 7,
    };

    println!("Is part: {:?}", engine.is_part(&part_location));

    let part_locations = engine.get_part_locations();
    println!("Found {:?} parts", part_locations.len());

    let part_numbers: Vec<u32> = part_locations
        .iter()
        .map(|part_location| engine.get_part_number(part_location))
        .collect();
    println!("Part Nos: {:?}", part_numbers);

    println!("{:?}", part_numbers.iter().sum::<u32>());

    let mut gear_ratio_sum = 0;
    for symbol_location in engine.symbol_locations.iter() {
        let symbol = engine.schematic[symbol_location.row][symbol_location.col];

        if symbol != '*' {
            continue;
        }

        println!("Symbol: {:?} {}", symbol_location, symbol);
        let adjacent_parts: Vec<u32> = part_locations
            .iter()
            .filter(|part_location| {
                let (top_left, bottom_right) = engine.get_part_box(part_location);
                is_in_box(symbol_location, top_left, bottom_right)
            })
            .map(|part_location| engine.get_part_number(part_location))
            .collect();

        if adjacent_parts.len() == 2 {
            gear_ratio_sum += adjacent_parts[0] * adjacent_parts[1];
        }
        println!("Adjacent parts: {:?}", adjacent_parts);
    }

    println!("Gear ratio sum: {}", gear_ratio_sum);
}
