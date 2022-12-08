export interface Tracks {
  [key: string]: Track;
}

interface Track {
  albumOfTrack: AlbumOfTrack;
  artists: Artists;
  contentRating: {
    label: string;
  };
  duration: {
    totalMilliseconds: number;
  };
  id: string;
  name: string;
  playability: {
    playable: boolean;
  };
  uri: string;
}

interface AlbumOfTrack {
  coverArt: {
    sources: Array<SourseInterface>;
  };
  id: string;
  name: string;
  uri: string;
  sharingInfo: {
    shareUrl: string;
  };
}

interface SourseInterface {
  height: number;
  url: string;
  width: number;
}

interface Artists {
  items: ArtistsProfile;
}

interface ArtistsProfile {
  profile: {
    name: string;
  };
  uri: string;
}
