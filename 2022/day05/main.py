with open("input.txt") as f:
    lines = [line for line in f]
    break_line = lines.index("\n")
    stack_info = [line.strip('\n') for line in lines[:break_line - 1]]
    move_info = [line.strip() for line in lines[break_line + 1:]]

stacks_transpose = [
    [line[i:i+3] for i in range(0, len(line), 4)]
    for line in stack_info
]

stacks = [
    [
        stacks_transpose[j][i]
        for j in range(len(stacks_transpose))
        if stacks_transpose[j][i] != "   "
    ]
    for i in range(len(stacks_transpose[0]))
]
for stack in stacks:
    print(stack)

moves = [] # n, from, to
for move_str in move_info:
    move_list = move_str.split(" ")
    moves.append((int(move_list[1]), int(move_list[3]), int(move_list[5])))

print(moves[:5])
for n, stack_from, stack_to in moves:
    # In Part I these crates were reversed
    # crates_to_move = list(reversed(stacks[stack_from - 1][:n]))
    # In Part II they're not
    crates_to_move = stacks[stack_from - 1][:n]
    stacks[stack_from - 1] = stacks[stack_from - 1][n:]
    stacks[stack_to - 1] = crates_to_move + stacks[stack_to - 1]
    print(stacks)

for stack in stacks:
    print(stack[0][1], end="")
