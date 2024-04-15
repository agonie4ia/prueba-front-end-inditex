export interface Podcast {
	artist: string;
	id: string;
	image: string;
	name: string;
	summary: string;
}

export interface Episode {
  artwork: string;
  date: string;
  description: string;
  duration: string;
  id: string;
  name: string;
  podcastArtist: string | undefined;
  podcastName: string | undefined;
  shortDescription: string;
  url: string;
  onPlayerClick?: (episode: Episode) => void;
}

export interface Episodes {
  count: number;
  list: Episode[];
}

export interface EpisodesHook {
  episodes: Episodes | undefined;
  getEpisodes: () => Promise<void>;
  loadingEpisodes: boolean;
  error?: Error;
}

export interface EpisodesListProps {
  podcast: Podcast;
  onEpisodesLoaded: (loaded: boolean) => void;
  onEpisodeClick: (episode: Episode) => void;
}

export interface EpisodesPlayerProps {
  podcast: Podcast;
  episode: Episode;
  onPlayerClick: (podcast: Podcast) => void;
}

export interface HeaderProps {
  onHeaderClick: () => void;
  loading?: boolean;
}

export interface PodcastsHook {
  podcasts: Podcast[];
  getPodcasts: () => Promise<void>;
  loadingPodcasts: boolean;
  error?: Error;
}

export interface PodcastsListProps {
  podcasts: Podcast[];
  onPodcastClick: (podcast: Podcast) => void;
}
