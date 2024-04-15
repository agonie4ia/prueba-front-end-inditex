

import { fetchPodcasts } from "./../services/dataFetching";

describe("fetchPodcasts", () => {
	it("should fetch the list of all podcasts", async () => {
		const podcastList = await fetchPodcasts();
		expect(Array.isArray(podcastList)).toBe(true);
		expect(podcastList.length).toBeGreaterThan(0);
	});
});

// TODO: fails with " Error: Cross origin http://localhost forbidden" error, trying to fix it
/* describe("fetchEpisodes", () => {
	it("should fetch the episodes for a podcast ID", async () => {
		const podcastId = "1535809341"; // TODO: "The Joe Budden Podcast", un-hardcode it
		const episodes = await fetchEpisodes(podcastId);
		expect(Array.isArray(episodes)).toBe(true);
		expect(episodes.list.length).toBeGreaterThan(0);
	});
}); */