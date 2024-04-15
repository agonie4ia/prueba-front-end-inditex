import { parseIsoDate, parseMillisecondsToDuration } from "./../utils/parsers";

describe("parseIsoDate", () => {
	it("should parse an ISO date to formatted string", () => {
		const isoDate = "2024-04-13T12:34:56.789Z";
		const formattedDate = parseIsoDate(isoDate);
		expect(formattedDate).toBe("13/04/2024");
	});
});

describe("parseMillisecondsToDuration", () => {
	it("should parse milliseconds duration to a valid duration string", () => {
		const durationInMilliseconds = 1234567;
		const formattedDuration = parseMillisecondsToDuration(durationInMilliseconds);
		expect(formattedDuration).toBe("20:34");
	});

	it("should handle the parsed milliseconds duration hours correctly", () => {
		const durationInMilliseconds = 4567890;
		const formattedDuration = parseMillisecondsToDuration(durationInMilliseconds);
		expect(formattedDuration).toBe("1:16:07");
	});
});