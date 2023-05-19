export interface MovieCardProp {
  path: string;
  title: string;
  voteAverage: number;
  genreId: number;
  id: number;
  onClick: (id: number) => void;
}
