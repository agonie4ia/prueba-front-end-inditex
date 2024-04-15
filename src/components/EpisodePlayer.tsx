import React from "react";

// Interfaces
import { EpisodesPlayerProps } from "./../model/interfaces";

export function EpisodePlayer({ podcast, episode, onPlayerClick }: Readonly<EpisodesPlayerProps>) {
	return (
		<div className="episodes-div">

			<div className="episodes-podcast-info-div">

				<div className="episodes-podcast-info-container-div drop-shadow">

					<div className="episodes-podcast-info-img-div">

						<img
							src={episode.artwork}
							onClick={() => onPlayerClick(podcast)}
							className="episode-podcast-info-img"
							title={episode.name}
							alt={episode.name} />

					</div>

					<div
						onClick={() => onPlayerClick(podcast)}
						className="episode-podcast-info-name-div"
					>{episode.podcastName}</div>

					<div
						onClick={() => onPlayerClick(podcast)}
						className="episode-podcast-info-artist-div">By {episode.podcastArtist}</div>

					<div className="episodes-podcast-info-artist-div">{episode.name}</div>

					<div className="episodes-podcast-info-summary-div">
  
						<span className="episodes-podcast-info-summary-span">Description:</span><br /><br />
						<div dangerouslySetInnerHTML={{ __html: episode.shortDescription }} />
  
					</div>

				</div>

			</div>

			<div className="episodes-list-div">

				<div className="episodes-ul drop-shadow">

					<div className="episode-title-div">{episode.name}</div>

					<div className="episode-description-div" dangerouslySetInnerHTML={{ __html: episode.description }} />

					<div>

						<audio controls>
							<source src={episode.url} type="audio/mpeg" />
              Your browser does not support playing audios.
						</audio>

					</div>

				</div>

			</div>

		</div>
	);
}