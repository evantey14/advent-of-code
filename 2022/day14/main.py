with open("input.txt") as f:
    lines = [line.strip() for line in f]

# Parse rock lines
def parse_rock_line(line):
    points = line.split(" -> ")
    points = [p.split(",") for p in points]
    return [(int(p[0]), int(p[1])) for p in points]

rock_lines = [parse_rock_line(l) for l in lines]

# Set up grid
grid = [["." for _ in range(1000)] for _ in range(200)]

def print_grid(grid):
    out = ""
    for row in grid:
        out += "".join(row[490:510]) + "\n"
    print(out)

# Build rock lines
def sign(x):
    return int(x / abs(x))

for rock_line in rock_lines:
    for i in range(1, len(rock_line)):
        start = rock_line[i-1]
        end = rock_line[i]
        if start[0] != end[0]:
            s = sign(end[0] - start[0])
            for j in range(start[0], end[0] + s, s):
                grid[start[1]][j] = "#"
        else:
            s = sign(end[1] - start[1])
            for j in range(start[1], end[1] + s, s):
                grid[j][start[0]] = "#"

# print_grid(grid)

max_depth = 0
for i, row in enumerate(grid):
    for c in row:
        if c == "#" and i > max_depth:
            max_depth = i
print(max_depth)
grid[max_depth + 2] = ["#" for _ in range(1000)]

# Simulate sand
max_depth = 190
for i in range(100000):
    if grid[0][500] == "o":
        print(i)
        break

    current_position = (0, 500)
    previous_position = None
    # while current_position[0] < max_depth:
    while True:
        down = current_position[0] + 1, current_position[1]
        if grid[down[0]][down[1]] == ".":
            previous_position = current_position
            current_position = down
            continue
        down_left = current_position[0] + 1, current_position[1] - 1
        if grid[down_left[0]][down_left[1]] == ".":
            previous_position = current_position
            current_position = down_left
            continue

        down_right = current_position[0] + 1, current_position[1] + 1
        if grid[down_right[0]][down_right[1]] == ".":
            previous_position = current_position
            current_position = down_right
            continue

        grid[current_position[0]][current_position[1]] = "o"
        break
    print(current_position)
    # if current_position[0] == max_depth:
    #     print(i)
    #    break
# print_grid(grid)
