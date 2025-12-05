const day = Deno.args[0];
const dir = `day${day.padStart(2, "0")}`;

Deno.mkdirSync(dir);
["main.ts", "input.txt", "example.txt"].forEach((f) =>
  Deno.writeTextFileSync(`${dir}/${f}`, "")
);

console.log(`Created ${dir}/`);
