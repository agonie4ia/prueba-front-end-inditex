import React, { useEffect, useState } from "react";

// Hooks
import { useEpisodes } from "./../hooks/useEpisodes";

// Interfaces
import { Episode, Episodes, EpisodesListProps } from "./../model/interfaces";

export function EpisodesList({ podcast, onEpisodesLoaded, onEpisodeClick }: Readonly<EpisodesListProps>) {

	useEffect(() => {
		const episodesLastRequest = localStorage.getItem("episodesLastRequest");
		const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
		const currentTime = Date.now();
		if (!episodesLastRequest || currentTime - parseInt(episodesLastRequest, 10) >= oneDayInMilliseconds) {
			onEpisodesLoaded(true); // TODO: use hook "loadingEpisodes" instead ogf this
			setTimeout(() => { // Timer added to show the loading indicator
				getEpisodes();
				onEpisodesLoaded(false);
			}, 3000);
		} else {
			const localStorageEpisodesList = localStorage.getItem("episodesList");
			// console.log(`\\src\\components\\EpisodesList.tsx  useEffect() localStorageEpisodesList?\n${localStorageEpisodesList}`);
			if (localStorageEpisodesList && JSON.parse(localStorageEpisodesList).length > 0) {
				setEpisodes(JSON.parse(localStorageEpisodesList));
			} else {
				onEpisodesLoaded(true); // TODO: use hook "loadingEpisodes" instead ogf this
				setTimeout(() => { // Timer added to show the loading indicator
					getEpisodes();
					onEpisodesLoaded(false);
				}, 3000);
			}
		}
	}, []);

	const [episodesFromLocalStorage, setEpisodes] = useState<Episodes>();
	const { episodes, getEpisodes } = useEpisodes(podcast.id); // TODO: "loadingEpisodes" at hook is unused
  
	// console.log(`\\src\\components\\EpisodesList.tsx EpisodesList() episodes?.list.length? ${episodes?.list.length} `);
	// console.log(`\\src\\components\\EpisodesList.tsx episodesFromLocalStorage?\n${JSON.stringify(episodesFromLocalStorage)}`);
	// console.log(`\\src\\components\\EpisodesList.tsx EpisodesList() episodes?\n${JSON.stringify(episodes)} `);
	// console.log(`\\src\\components\\EpisodesList.tsx EpisodesList() episodes?.count? ${episodes?.count} `);

	const theEpisodes = (episodesFromLocalStorage && episodesFromLocalStorage.count > 0) ? episodesFromLocalStorage : episodes;

	if (theEpisodes?.count && (theEpisodes?.list.length > 0)) {
		return (
			<div className="episodes-div">

				<div className="episodes-podcast-info-div">

					<div className="episodes-podcast-info-container-div drop-shadow">

						<div className="episodes-podcast-info-img-div">

							<img
								src={podcast.image}
								className="episodes-podcast-info-img"
								title={podcast.name}
								alt={podcast.name} />

						</div>

						<div className="episodes-podcast-info-name-div">{podcast.name}</div>

						<div className="episodes-podcast-info-artist-div">By {podcast.artist}</div>

						<div className="episodes-podcast-info-summary-div">
							
							<span className="episodes-podcast-info-summary-span">Description:</span><br /><br />{podcast.summary}
							
						</div>

					</div>
				
				</div>

				<div className="episodes-list-div">

					<div className="episodes-list-count-div drop-shadow">Episodes: {episodes?.count}</div>

					<ul className="episodes-ul drop-shadow">

						<li className="episode-li">

							<div className="episode-name-div">Title</div>

							<div className="episode-date-div">Date</div>

							<div className="episode-duration-div">Duration</div>

						</li>

						{episodes?.list.map((episode: Episode) => (
							<li
								key={`li-${episode.id}`}
								onClick={() => onEpisodeClick(episode)}
								className="episode-li">

								<div key={`episode-name-div-${episode.id}`} className="episode-name-div">{episode.name}</div>

								<div key={`episode-date-div-${episode.id}`} className="episode-date-div">{episode.date}</div>

								<div key={`episode-duration-div-${episode.id}`} className="episode-duration-div">{episode.duration}</div>

							</li>
						))}
					</ul>

				</div>

			</div>
		);
	}
	// return (<span>No episodes were found, please try a different search</span>); // To inform that no results where got
}
