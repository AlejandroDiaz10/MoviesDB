import React from "react";
import { IMAGE_SOURCE } from "constants/moviesMock";
import genres from "constants/genres.json";
import { MovieCardProp } from "./types";
import {
  ImageContainer,
  InfoShow,
  ShowBox,
  ShowCalification,
  ShowLabelTitle,
  ShowThumb,
  ShowTitle,
} from "./styles";
import { Pill } from "components/Pill";

const MovieCard: React.FC<MovieCardProp> = ({
  path,
  title,
  voteAverage,
  genreId,
  id,
  onClick,
}) => {
  //https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg
  const posterImage = IMAGE_SOURCE + path;
  const poster = path === null ? "https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg" : IMAGE_SOURCE + path;

  const getGenre = (genreId: number) => {
    const key: any = Object.keys(genres.genres).find(
      (genre: any): boolean => genres.genres[genre].id === genreId
    );
    if (key) {
      return genres.genres[key].name;
    }
    return "Not Classified";
  };

  const getColor = (rating: number) => {
    if (rating >= 8) {
      return '#74B566';
    } else if (rating >= 7) {
      return '#efca54';
    }
  }

  return (
    <ShowBox onClick={() => onClick(id)}>
      <ImageContainer>
        <ShowThumb src={poster} />
      </ImageContainer>
      <InfoShow>
        <ShowTitle>
          <Pill genre={getGenre(genreId)} pillColor={getColor(voteAverage)} />
          <ShowLabelTitle>{title}</ShowLabelTitle>
          <ShowCalification>* {voteAverage} / 10</ShowCalification>
        </ShowTitle>
      </InfoShow>
    </ShowBox>
  );
};

export default MovieCard;
