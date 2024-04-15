import { useState, useCallback } from "react";

// Interfaces
import { Podcast, PodcastsHook } from "./../model/interfaces";

// Services
import { fetchPodcasts } from "./../services/dataFetching";

export function usePodcasts(): PodcastsHook {
	const [podcasts, setPodcasts] = useState<Podcast[]>([]);
	const [loadingPodcasts, setLoadingPodcasts] = useState(false);
	const [error, setError] = useState<Error | undefined>(undefined);

	const getPodcasts = useCallback(async () => {
		try {
			setLoadingPodcasts(true);
			const data = await fetchPodcasts();
			setTimeout(() => { // Timer added to show the loading indicator
				setPodcasts(data);
				localStorage.setItem("podcastsLastRequest", Date.now().toString());
				localStorage.setItem("podcastsList", JSON.stringify(data));
				setLoadingPodcasts(false);
			}, 3000);
		} catch (error) {
			console.log("Error at \\src\\hooks\\useList.ts getList():\n" + error);
			setError(error as Error); 
		}
	}, []);

	return { podcasts, getPodcasts, loadingPodcasts, error };
}
