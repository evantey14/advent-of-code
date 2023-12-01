with open("input.txt") as f:
    lines = [line.strip() for line in f]

height_map = [line for line in lines]
# print(height_map)
for i in range(len(height_map)):
    for j in range(len(height_map[i])):
        if height_map[i][j] == "S":
            start = i, j

def is_valid_pos(position):
    if position[0] < 0 or position[0] >= len(height_map):
        return False
    if position[1] < 0 or position[1] >= len(height_map[0]):
        return False
    return True

def is_valid_step(position, neighbor):
    # print("is_valid_step", position, neighbor)
    cur_height = height_map[position[0]][position[1]]
    new_height = height_map[neighbor[0]][neighbor[1]]
    if cur_height == "S":
        cur_height = "a"
    if new_height == "E":
        new_height = "z"
    if cur_height == "E":
        cur_height = "z"
    if new_height == "S":
        new_height = "a"

    return ord(cur_height) >= ord(new_height) - 1

def get_neighbors(position):
    neighbors = [
        (position[0] + i, position[1] + j)
        for i, j in [(1, 0), (-1, 0), (0, 1), (0, -1)]
    ]

    return [n for n in neighbors if is_valid_pos(n)]


def find_shortest_path_length(start):
    # print(start)
    queue = [(start, 0)]
    visited = set()
    while len(queue) != 0:
        cur, steps = queue.pop(0)
        # print(cur, height_map[cur[0]][cur[1]], steps)
        if height_map[cur[0]][cur[1]] == "E":
            # print(cur, steps)
            return steps
        if cur in visited:
            continue
        visited.add(cur)
        neighbors = get_neighbors(cur)
        for neighbor in neighbors:
            if neighbor not in visited and is_valid_step(cur, neighbor):
                queue.append((neighbor, steps + 1))
    return len(height_map)**3

print(find_shortest_path_length(start))

shortest_distance = len(height_map) ** 3 # this needs to be higher than the num of positions
for i in range(len(height_map)):
    for j in range(len(height_map[i])):
        if height_map[i][j] == "a":
            distance = find_shortest_path_length((i, j))
            # print(distance, i, j, shortest_distance)
            if distance < shortest_distance:
                shortest_distance = distance
                print("update", distance, i, j)
