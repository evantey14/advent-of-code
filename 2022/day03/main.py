with open("input.txt") as f:
    lines = [l.strip() for l in f]

def get_score(c):
    ascii_value = ord(c)
    if ascii_value >= 97:
        return ascii_value - 96
    else:
        return ascii_value - 64 + 26

print(get_score("a")) # 1
print(get_score("z")) # 26
print(get_score("A")) # 27
print(get_score("Z")) # 52

## PART I
result = 0
for rucksack in lines:
    first = rucksack[:len(rucksack)//2]
    second = rucksack[len(rucksack)//2:]
    # print(sorted(first), sorted(second))
    first_set = set(first)

    for item in second:
        if item in first_set:
            result += get_score(item)
            break

print(result)

## PART I
result = 0
for i in range(0, len(lines), 3):
    first = set(lines[i])
    second = set(lines[i+1])
    third = set(lines[i+2])
    shared = list(first.intersection(second, third))[0]
    result += get_score(shared)
print(result)
