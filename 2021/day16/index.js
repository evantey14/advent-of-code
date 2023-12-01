/*
- Packet
    - first 3: version
    - next 3: type id

    - if type ID == 4. LITERAL
        - 5 bit chunk
            - first: 
                - 0 -> last chunk
                - 1 -> more chunks
            - next 4: binary #
    - if type ID != 4. OPERATOR
        - next bit: length type id
            - 0 -> next 15 bits is bit length of subpackets.
            - 1 -> next 11 bits is # of subpackets
        - contains 1 or more packets
*/
const fs = require("fs");

const input = fs
  .readFileSync("day16/input.txt")
  .toString()
  .split("\n")[0]

console.log(input.length);
const packet = input.split("").map(i => parseInt(i, 16).toString(2).padStart(4, "0")).join("");

function parseLiteral(bitString) {
    let chunks = "";
    let chunk = "";
    let rest = bitString;
    do {
        chunk = rest.slice(0, 5);
        rest = rest.slice(5);
        chunks += chunk.slice(1, 5);
    } while (chunk[0] === "1");
    return [
        parseInt(chunks, 2),
        rest
    ];
}

function parseOperator(type_id, subpacketValues) {
    switch (type_id) {
        case "000":
            return subpacketValues.reduce((acc, val) => acc + val, 0);
        case "001":
            return subpacketValues.reduce((acc, val) => acc * val, 1);
        case "010":
            return Math.min(...subpacketValues);
        case "011":
            return Math.max(...subpacketValues);
        case "101":
            return subpacketValues[0] > subpacketValues[1] ? 1 : 0;
        case "110":
            return subpacketValues[0] < subpacketValues[1] ? 1 : 0;
        case "111":
            return subpacketValues[0] === subpacketValues[1] ? 1 : 0;
    }
}

function parsePacket(packet) {
    const version = packet.slice(0, 3);
    const type_id = packet.slice(3, 6);
    let rest = packet.slice(6);
    if (type_id === "100") {
        let literal;
        [literal, rest] = parseLiteral(rest);
        return [
            literal,
            packet.length - rest.length
        ];
    } else {
        const length_type_id = rest[0];
        let length;
        if (length_type_id === "0") {
            length = parseInt(rest.slice(1, 16), 2);
            rest = rest.slice(16);
        } else {
            length = parseInt(rest.slice(1, 12), 2);
            rest = rest.slice(12);
        }
        let subpacketValues = [];
        let subpacketsLength = 0; 
        while (
            (length_type_id === "0" && subpacketsLength < length)
            || (length_type_id === "1" && subpacketValues.length < length)
        ) {
            const [subpacketValue, subpacketLength] = parsePacket(rest);
            subpacketsLength += subpacketLength;
            rest = rest.slice(subpacketLength);
            subpacketValues.push(subpacketValue);
        }
        return [
            parseOperator(type_id, subpacketValues),
            packet.length - rest.length
        ];
    }
}
console.log(packet);
console.log(parsePacket(packet));