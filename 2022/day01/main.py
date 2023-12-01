with open("input.txt") as f:
    lines = [line.strip() for line in f]

print(lines)
elves = [0]
for line in lines:
    if line == "":
        elves.append(0)
    else:
        elves[-1] += int(line)
print(elves)
print(max(elves))

print(sum(sorted(elves)[-3:]))
