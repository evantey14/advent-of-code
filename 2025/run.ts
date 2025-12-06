const [day] = Deno.args
const dayDir = `day${day.padStart(2, "0")}`
await import(`./${dayDir}/main.ts`)
