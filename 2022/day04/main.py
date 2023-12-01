with open("input.txt") as f:
    lines = [line.strip().split(",") for line in f]

def pair_from_str(s):
    tup = s.split("-")
    return int(tup[0]), int(tup[1])

pairs = [
    [pair_from_str(s) for s in line] for line in lines
]

def is_contained_in(range1, range2):
    return range1[0] >= range2[0] and range1[1] <= range2[1]


def dont_overlap(range1, range2):
    return range1[1] < range2[0] or range2[1] < range1[0]

fully_contained_count = 0
overlap_count = 0
for elf1, elf2 in pairs:
    if is_contained_in(elf1, elf2) or is_contained_in(elf2, elf1):
        fully_contained_count += 1
    if not dont_overlap(elf1, elf2):
        overlap_count += 1
print(fully_contained_count)
print(overlap_count)
