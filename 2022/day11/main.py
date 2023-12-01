with open("input.txt") as f:
    lines = [line.strip() for line in f]

class Monkey:
    def __init__(self, lines):
        self.name = lines[0][:-1]

        items_str = lines[1].split(", ")
        items_str[0] = items_str[0].split(" ")[-1]
        self.items = [int(i) for i in items_str]

        op_str = " ".join(lines[2].split(" ")[3:])
        self.op = lambda old: eval(op_str)

        self.div_check = int(lines[3].split(" ")[-1])
        self.true_monkey = int(lines[4].split(" ")[-1])
        self.false_monkey = int(lines[5].split(" ")[-1])
        self.inspections = 0

    def check_item(self, item):
        self.inspections += 1
        if item % self.div_check == 0:
            return self.true_monkey
        else:
            return self.false_monkey

    def __repr__(self):
        return f"{self.name}: {self.items}"

    def describe(self):
        print(
            f"{self.name}: {self.items}\n"
            f"{self.div_check} -> {self.true_monkey} or {self.false_monkey}"
        )

monkeys = []
for i in range(0, len(lines), 7):
    monkeys.append(Monkey(lines[i:i+7]))

print(monkeys)

divisors = [m.div_check for m in monkeys]
lcm = 1
for d in divisors:
    lcm *= d
print(lcm, divisors)

for r in range(10000):
    for monkey in monkeys:
        for item in monkey.items:
            # updated_item = monkey.op(item) // 3
            updated_item = monkey.op(item) % lcm # updated for part II
            target_index = monkey.check_item(updated_item)
            monkeys[target_index].items.append(updated_item)
        monkey.items = []
    # print(monkeys)
    if r % 1000 == 999:
        print(r, [m.inspections for m in monkeys])


inspections = sorted([m.inspections for m in monkeys])
print(inspections[-1] * inspections[-2])

