import { useState, useCallback } from "react";

// Interfaces
import { Episodes, EpisodesHook } from "./../model/interfaces";

// Services
import { fetchEpisodes } from "./../services/dataFetching";

export function useEpisodes(id: string): EpisodesHook  {
	const [episodes, setEpisodes] = useState<Episodes | undefined>();
	const [loadingEpisodes, setLoadingEpisodes] = useState(false);
	const [error, setError] = useState<Error | undefined>(undefined);

	const getEpisodes= useCallback(async () => {
		try {
			setLoadingEpisodes(true);
			const data = await fetchEpisodes(id);
			setTimeout(() => { // Timer added to show the loading indicator
				setEpisodes(data);
				localStorage.setItem("episodesLastRequest", Date.now().toString());
				localStorage.setItem("episodesList", JSON.stringify(data));
			}, 3000);
		} catch (error) {
			console.log("Error at \\src\\hooks\\useEpisodes.ts getEpisodes():\n" + error);
			setError(error as Error); 
		} finally {
			setLoadingEpisodes(false);
		}
	}, [id]);

	return { episodes, getEpisodes, loadingEpisodes, error };
}