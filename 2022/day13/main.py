import functools

with open("input.txt") as f:
    lines = [line.strip() for line in f]

def packets_ordered(packet1, packet2):
    if isinstance(packet1, int) and isinstance(packet2, int):
        if packet1 == packet2:
            return 0
        else:
            return 1 if packet1 < packet2 else -1
    if isinstance(packet1, list) and isinstance(packet2, list):
        for i in range(len(packet1)):
            if i >= len(packet2):
                return -1
            result = packets_ordered(packet1[i], packet2[i])
            if result != 0:
                return result
        if len(packet1) == len(packet2):
            return 0
        return 1 if len(packet1) < len(packet2) else -1
    if isinstance(packet1, int):
        return packets_ordered([packet1], packet2)
    if isinstance(packet2, int):
        return packets_ordered(packet1, [packet2])

output = 0
for i in range(0, len(lines), 3):
    packet1 = eval(lines[i])
    packet2 = eval(lines[i+1])
    ordered = packets_ordered(packet1, packet2)
    # print(i // 3, ordered, packet1, "vs", packet2)
    if ordered == 1:
        output += i // 3 + 1
print(output)

packets = [eval(line) for line in lines if line != ""]
packets.append([[2]])
packets.append([[6]])
sorted_packets = sorted(packets, key=functools.cmp_to_key(packets_ordered), reverse=True)
for i, p in enumerate(sorted_packets):
    if p == [[2]]:
        print(i + 1, p)
    if p == [[6]]:
        print(i + 1, p)
