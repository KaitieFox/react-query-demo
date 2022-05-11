import React from "react";
import { useSuperHeroData } from "../hooks/useSuperHeroData";
import { useParams } from "react-router-dom";

export const RQSuperHeroPage = () => {
  //extract heroId from params through React Router
  const { heroId } = useParams();
  const { isLoading, data, isError, error } = useSuperHeroData(heroId);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h2>Super Hero Details</h2>
      <p>
        {data?.data.name} - {data?.data.alterEgo}
      </p>
    </div>
  );
};
