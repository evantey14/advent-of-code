with open("input.txt") as f:
    lines = [line.strip() for line in f]

print(lines)
x = 1
cycle = 1
check_cycle = 20
output = 0
for i, line in enumerate(lines):
    if line == "noop":
        cycle += 1
        if cycle > check_cycle:
            print(cycle, x, lines[i-1])
            output += x * check_cycle
            check_cycle += 40
    else:
        cycle += 2
        if cycle > check_cycle:
            print(cycle, x, lines[i-1])
            output += x * check_cycle
            check_cycle += 40
        x += int(line.split(" ")[1])

print(output)


# Doing it again but focused on cycles
i = 0
cycle = 1
x = 1
addx_status = 0
check_cycle = 20
output = 0
display = ""
while i < len(lines):
    # start of cycle
    # print("Starting cycle", cycle, "x =", x)
    display += "#" if abs(cycle % 40 - 1 - x) <= 1 else "."
    if cycle == check_cycle:
        print("Starting cycle", cycle, "x =", x)
        output += x * check_cycle
        check_cycle += 40
    if cycle % 40 == 0:
        display += "\n"

    if addx_status == 1:
        addx_status = 0
        # end of cycle
        x += int(lines[i].split(" ")[1])
        i += 1
    elif lines[i] == "noop":
        i += 1
    else:
        addx_status = 1

    # print("After end of cycle", cycle, "x =", x)
    cycle += 1

print(output)
print(display)
