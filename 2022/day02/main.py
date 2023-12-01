with open("input.txt") as f:
    lines = [line.strip().split() for line in f]

# Part I
# A B C are rock, paper, scissors
# X Y Z are rock paper scissors
# score for your shape (1 2 3 for R P S)
# score for outcome (0 3 6 for L D W)

scores = []
for opponent, you in lines:
    # Convert to ints: 1 2 3 for R P S
    opp_int = ord(opponent) - 64
    your_int = ord(you) - 87
    match opp_int - your_int:
        case 1 | -2: # opp wins
            score = your_int + 0
        case 0: # tie
            score = your_int + 3
        case -1 | 2: # we win
            score = your_int + 6
    scores.append(score)

print(sum(scores))


# Part II
# A B C are rock, paper, scissors
# X Y Z are L D W
# score for your shape (1 2 3 for R P S)
# score for outcome (0 3 6 for L D W)

scores = []
for opponent, you in lines:
    # Convert to ints: 1 2 3 for R P S
    opp_int = ord(opponent) - 64
    outcome_int = ord(you) - 87
    match outcome_int:
        case 1: # lose
            score = (opp_int - 1 - 1) % 3 + 1
        case 2: # draw
            score = 3 + opp_int
        case 3: # win
            score = 6 + (opp_int + 1 - 1) % 3 + 1
    scores.append(score)

print(sum(scores))
