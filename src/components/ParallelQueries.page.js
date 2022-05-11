import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes/");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends/");
};

export const ParallelQueriesPage = () => {
  //parallel calls to queries.
  //alias the data prop to use the different datas
  const { data: superheroes } = useQuery("super-heroes", fetchSuperHeroes);
  const { data: friends } = useQuery("friends", fetchFriends);
  return <div>ParallelQueriesPage</div>;
};
