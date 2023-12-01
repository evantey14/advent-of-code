with open("input.txt") as f:
    lines = [line.strip() for line in f]

signal = lines[0]
print(signal)


last_four = []
for i, c in enumerate(signal):
    # print(last_four, set(last_four))
    if len(last_four) < 14:
        last_four.append(c)
        continue
    last_four.pop(0)
    last_four.append(c)
    if len(set(last_four)) == 14:
        print(i, last_four)
        break
