// Interfaces
import { Episode, Podcast } from "./../model/interfaces";

// Utils
import { parseIsoDate, parseMillisecondsToDuration } from "./../utils/parsers";

export const fetchPodcasts = async () => {
	try {
		const response = await fetch("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json");
		const responseJson = await response.json();
		// console.log(`\\src\\services\\dataFetching.ts fetchPodcasts() responseJson?\n${JSON.stringify(responseJson)}`);
		const list: Podcast[] = (responseJson.feed.entry || []).map((podcast: {
      "im:artist": { label: string };
      id: { attributes: { "im:id": string } };
      "im:name": { label: string };
      "im:image": { [index: number]: { label: string } };
      summary: { label: string };
    }) => {
			const artist = podcast["im:artist"].label;
			const id = podcast.id.attributes["im:id"];
			const name = podcast["im:name"].label;
			const image = podcast["im:image"][2].label;
			const summary = podcast.summary.label;
			return { id, artist, name, summary, image };
		});
		// console.log(`\\src\\services\\dataFetching.ts fetchPodcasts() list?\n${JSON.stringify(list)}`);
		return list;
	} catch (error) {
		console.log(`Error at \\src\\services\\dataFetching.ts fetchPodcasts():\n${error}`);
		return [];
	}
};

export const fetchEpisodes = async (id: string) => {
	try {
		// console.log(`\\src\\services\\dataFetching.ts fetchEpisodes() id? ${id}`);
		const response = await fetch(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`);
		const responseJson = await response.json();
		// console.log(`\\src\\services\\dataFetching.ts fetchEpisodes() responseJson?\n${JSON.stringify(responseJson)}`);
		const count: number = responseJson.resultCount;
		const list: Episode[] = (responseJson.results || []).map((episode: {
      artworkUrl600: string;
      description: string;
      episodeUrl: string;
      releaseDate: string;
      shortDescription: string;
      trackId: string;
      trackName: string;
      trackTimeMillis: number;
    }) => {
			const id = episode.trackId;
			const artwork = episode.artworkUrl600;
			const date = parseIsoDate(episode.releaseDate);
			const description = episode.description;
			const duration = parseMillisecondsToDuration(episode.trackTimeMillis);
			const name = episode.trackName;
			const shortDescription = episode.shortDescription;
			const url = episode.episodeUrl;
			return { artwork, date, description, duration,id, name, shortDescription, url };
		});
		// console.log(`\\src\\services\\dataFetching.ts fetchEpisodes() count? ${count}`);
		// console.log(`\\src\\services\\dataFetching.ts fetchEpisodes() list?\n${JSON.stringify(list)}`);
		return { count, list };
	} catch (error) {
		console.log(`Error at \\src\\services\\dataFetching.ts fetchEpisodes():\n${error}`);
		return { "count": 0, "list": [] };
	}
};


