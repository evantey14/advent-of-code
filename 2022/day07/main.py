with open("input.txt") as f:
    lines = [line.strip() for line in f]


class File:
    def __init__(self, name, size):
        self.name = name
        self.size = int(size)

    def get_size(self):
        return self.size

    def __repr__(self):
        return f"{self.name} {self.size}"

class Directory:
    def __init__(self, name, parent_dir):
        self.name = name
        self.parent_dir = parent_dir
        self.contents = []

    def add_contents(self, contents):
        for content in contents:
            first, second = content.split(" ")
            if first == "dir":
                self.contents.append(Directory(second, self))
            else:
                self.contents.append(File(second, first))

    def get_subdir(self, name):
        for content in self.contents:
            if isinstance(content, Directory) and content.name == name:
                return content
        raise Exception(f"{name} not found in {self}")

    def get_parent_dir(self):
        return self.parent_dir

    def get_size(self):
        size = 0
        for content in self.contents:
            size += content.get_size()
        return size

    def __repr__(self):
        return f"{self.name}: {self.contents}"

root_dir = Directory("/", None)
working_dir = None
contents = []
for line in lines:
    print(line)
    tokens = line.split(" ")
    if tokens[0] == "$":
        if len(contents) > 0:
            working_dir.add_contents(contents)
            contents = []
        if tokens[1] == "cd":
            if tokens[2] == "..":
                working_dir = working_dir.get_parent_dir()
            elif tokens[2] == "/":
                working_dir = root_dir
            else:
                working_dir = working_dir.get_subdir(tokens[2])
        elif tokens[1] == "ls":
            continue
    else:
        contents.append(line)

if len(contents) > 0:
    working_dir.add_contents(contents)

print(root_dir, root_dir.get_size())
total = 70000000
used_space = root_dir.get_size()
print("USED:", used_space)
print("UNUSED:", total - used_space)
need_to_free = 30000000 - (70000000 - used_space)
print("NEED TO FREE:", need_to_free)

queue = [root_dir]
s = 0
smallest_deletable = 70000000
while len(queue) != 0:
    current = queue.pop()
    current_size = current.get_size()
    if current_size < 100000:
        s += current_size
    if current_size > need_to_free and current_size < smallest_deletable:
        smallest_deletable = current_size
    queue.extend([subdir for subdir in current.contents if isinstance(subdir, Directory)])

print(s)
print(smallest_deletable)
