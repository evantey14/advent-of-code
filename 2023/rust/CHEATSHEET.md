# Running things

- individual files: `rustc main.rs` then `./main`
- projects:
  - `cargo check` sees if can compile (faster than build)
  - `cargo build` compiles & makes executable
  - `cargo run` compiles & runs executable
  - these all use `target/debug`
  - I think it just knows `main.rs` is the thing to use

# ??

- prelude = standard library
- `let mut guess = String::new();`
  - `::new` says `new` is an associated function w type `String`
- `parse()` looks at the type you're supposed to have and uses the relevant `FromStr`
  - `FromStr` is basically a constructor given a str input
- `split_once` just gets first vs rest of stuff

# TODO

- make main.rs take stdin for specifying the day
