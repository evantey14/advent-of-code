import re
from tqdm import tqdm

with open("input.txt") as f:
    lines = [line.strip() for line in f]

# print(lines)

pairs = []
def point_from_str(s):
    # We're doing everything in "row, column" coordinates
    # Inputs are in x, y (x is horizontal, y is vertical) so we're flipping them
    xy = s.split(",")
    return int(xy[1].split("=")[1]), int(xy[0].split("=")[1])

for line in lines:
    sensor_str, beacon_str = re.findall("x=[-|0-9]+, y=[-|0-9]+", line)
    pairs.append((point_from_str(sensor_str), point_from_str(beacon_str)))

# print(pairs)

def get_distance(p1, p2):
    # Calculate manhattan distance
    return abs(p2[0] - p1[0]) + abs(p1[1] - p2[1])

row_of_interest = 2000000
# row_of_interest = 10
row_of_interest_max = 4000000
beacons_in_row = set()
intervals = []

for row_of_interest in tqdm(range(row_of_interest_max)):
    intervals = []
    for sensor, beacon in pairs:
        if beacon[0] == row_of_interest:
            beacons_in_row.add(beacon)
        closest_beacon_distance = get_distance(sensor, beacon)
        closest_point = row_of_interest, sensor[1]
        width = closest_beacon_distance - abs(sensor[0] - row_of_interest)
        if width < 0:
            continue

        interval = sensor[1] - width, sensor[1] + width
        intervals.append(interval)
        # print(sensor, closest_beacon_distance, closest_point, width, interval)

    sorted_intervals = sorted(intervals, key=lambda x: x[0])
    # print(sorted_intervals)
    cur_start, cur_stop = None, None
    merged_intervals = []
    for i, interval in enumerate(sorted_intervals):
        if cur_start is None:
            cur_start, cur_stop = interval
        if sorted_intervals[i][0] <= cur_stop:
            if sorted_intervals[i][1] > cur_stop:
                cur_stop = sorted_intervals[i][1]
        else:
            merged_intervals.append((cur_start, cur_stop))
            cur_start, cur_stop = interval
    merged_intervals.append((cur_start, cur_stop))
    if merged_intervals[0][0] > 0 or merged_intervals[0][1] < 4000000:
        print(row_of_interest, merged_intervals)
    # s = 0
    # for i in merged_intervals:
    #     s += i[1] - i[0]
    # print(s)

