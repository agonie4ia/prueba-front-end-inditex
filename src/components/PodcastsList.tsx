import React, { useState } from "react";

// Interfaces
import { PodcastsListProps } from "./../model/interfaces";

export function PodcastsList({ podcasts, onPodcastClick }: Readonly<PodcastsListProps>) {
	const [search, setSearch] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const filteredPodcasts = (search !== "") ? podcasts.filter((podcast) => {
		return podcast.artist.toLowerCase().includes(search.toLowerCase()) || podcast.name.toLowerCase().includes(search.toLowerCase());
	}) : podcasts;

	return (
		<>

			<div className="search-div">

				<span className="list-podcasts-count">{filteredPodcasts.length}</span>

				<input
					type="text"
					id="input-search"
					value={search}
					onChange={handleInputChange}
					placeholder="Filter podcasts..."
				/>

			</div>

			<div className="list-div">

				{(filteredPodcasts.length > 0) &&
					<ul className="podcasts-ul">
						{filteredPodcasts.map((podcast) => (
							<li
								key={`li-${podcast.id}`}
								onClick={() => onPodcastClick(podcast)}
								className="podcast-li">

								<div className="podcast-top-div" />

								<div className="podcast-bottom-div drop-shadow">

									<div key={`podcast-bottom-div-name-${podcast.id}`} className="podcast-name-div">{podcast.name}</div>
									<div key={`podcast-bottom-div-artist-${podcast.id}`} className="podcast-artist-div">Author: {podcast.artist}</div>
								
								</div>
								<div key={`podcast-bottom-div-img-div-${podcast.id}`}>

									<img
										key={`podcast-bottom-div-img-${podcast.id}`} 
										src={podcast.image}
										className="podcast-img"
										title={podcast.name}
										alt={podcast.name} />
								
								</div>

							</li>
						))
						}
					</ul>
					/* :
					<span>No podcasts were found, please try a different search.</span> */ // To inform that no results where got
				}

			</div>
		</>
	);
}
