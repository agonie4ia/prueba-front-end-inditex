/* eslint-disable indent */

import React, { useEffect, useState } from "react";

// Components
import Header from "./../components/Header";
import { EpisodePlayer } from "./../components/EpisodePlayer";
import { EpisodesList } from "./../components/EpisodesList";
import { PodcastsList } from "./../components/PodcastsList";

// Hooks
import { usePodcasts } from "./../hooks/usePodcasts";

// Interfaces
import { Episode, Podcast } from "./../model/interfaces";

// Styles
import "./../css/global.css";

function App () {
	useEffect(() => {
		const podcastsLastRequest = localStorage.getItem("podcastsLastRequest");
		const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
		const currentTime = Date.now();
		if (!podcastsLastRequest || currentTime - parseInt(podcastsLastRequest, 10) >= oneDayInMilliseconds) {
			getPodcasts();
		} else {
			const localStoragePodcastsList = localStorage.getItem("podcastsList");
      // console.log(`\\src\\screens\\Main.tsx useEffect() useEffect() localStoragePodcastsList?\n${JSON.stringify(localStoragePodcastsList)}`);
			if (localStoragePodcastsList && JSON.parse(localStoragePodcastsList).length > 0) {
				setPodcasts(JSON.parse(localStoragePodcastsList));
			} else {
				getPodcasts();
			}
		}
	}, []);

	const [podcastsFromLocalStorage, setPodcasts] = useState<Podcast[]>([]);
	const { podcasts, getPodcasts, loadingPodcasts } = usePodcasts();
	const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
	const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

	const handleHeaderClick = () => {
		setSelectedPodcast(null);
		setSelectedEpisode(null);
	};

	const handlePodcastClick = (podcast: Podcast) => {
		setSelectedPodcast(podcast);
		// console.log(`\\src\\screens\\Main.tsx App() handlePodcastClick() selectedPodcast?\n${JSON.stringify(selectedPodcast)}`);
	};

  const handleEpisodesLoaded = (value: boolean) => {
    setLoadingEpisodes(value);
  };

	const handleEpisodeClick = (episode: Episode) => {
		episode.podcastArtist = selectedPodcast?.artist;
		episode.podcastName = selectedPodcast?.name;
		setSelectedEpisode(episode);
		// console.log(`\\src\\screens\\Main.tsx App() handleEpisodeClick() selectedEpisode?\n${JSON.stringify(selectedEpisode)}`);
	};

  const handlePlayerClick = (podcast: Podcast) => {
		//console.log(`\\src\\screens\\Main.tsx App() handlePlayerClick() podcast?\n${JSON.stringify(podcast)}`);
    setSelectedPodcast(podcast);
    setSelectedEpisode(null);
	};

  // console.log(`\\src\\screens\\Main.tsx podcastsFromLocalStorage?\n${JSON.stringify(podcastsFromLocalStorage)}`);
	// console.log(`\\src\\screens\\Main.tsx podcasts?\n${JSON.stringify(podcasts)}`);
  // console.log(`\\src\\screens\\Main.tsx loadingPodcasts? ${loadingPodcasts}`);
	// console.log(`\\src\\screens\\Main.tsx loadingEpisodes? ${loadingEpisodes}`);

	return (
		<div className="container">

			<Header onHeaderClick={handleHeaderClick} loading={loadingPodcasts || loadingEpisodes} />

			<main>

				{!selectedPodcast &&
					<PodcastsList podcasts={(podcastsFromLocalStorage.length > 0) ? podcastsFromLocalStorage : podcasts} onPodcastClick={handlePodcastClick} />
				}

				{selectedPodcast && !selectedEpisode &&
					<EpisodesList podcast={selectedPodcast} onEpisodesLoaded={handleEpisodesLoaded} onEpisodeClick={handleEpisodeClick} />
				}

				{selectedPodcast && selectedEpisode &&
					<EpisodePlayer podcast={selectedPodcast} episode={selectedEpisode} onPlayerClick={handlePlayerClick} />
				}

			</main>

		</div>
	);
}

export default App;
