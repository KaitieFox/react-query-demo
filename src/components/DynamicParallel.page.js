import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

// component does not know ahead of time how many queries it needs to execute
// for dynamic queries, using multiple useQuery calls is insufficient
// we need a different hook - useQueries
const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  console.log({ queryResults });
  return <div>DynamicParallelPage</div>;
};
