import { describe, expect, test } from "vitest";
import { cleanInput } from "./repl.js";

describe.each([
	{
		input: "  hello  world  ",
		expected: ["hello", "world"],
	},
	{
		input: "Charmander Bulbasaur PIKACHU",
		expected: ["charmander", "bulbasaur", "pikachu"],
	},
	{
		input: "single",
		expected: ["single"],
	},
	{
		input: "  MULTIPLE   SPACES   BETWEEN  ",
		expected: ["multiple", "spaces", "between"],
	},
	{
		input: "",
		expected: [""],
	},
])("cleanInput($input)", ({ input, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = cleanInput(input);

		expect(actual).toHaveLength(expected.length);

		for (const i in expected) {
			expect(actual[i]).toBe(expected[i]);
		}
	});
});
