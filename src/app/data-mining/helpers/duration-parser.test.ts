import { expect, test } from "bun:test";
import { iso8601ToSeconds } from "./duration-parser";

test("Umwandlung von ISO zu Sekunden", () => {
    const tests = [{
        input: "PT1H",
        expected: 3600
    }, {
        input: "PT1M",
        expected: 60
    }, {
        input: "PT1S",
        expected: 1
    }, {
        input: "PT1H1M1S",
        expected: 3661
    }, {
        input: "P1DT1H1M1S",
        expected: 90061
    }, {
        input: "P1W1DT1H1M1S",
        expected: 694861
    }]
    tests.forEach(test => expect(iso8601ToSeconds(test.input)).toBe(test.expected))
});