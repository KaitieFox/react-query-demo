import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

// custom useQuery hook
// convention 'use' refers to hook
export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    //steps to not making an additional network request once mutation succeeds:
    // step 1: use param 'data' (which is the entire response for post request)
    onSuccess: (data) => {
      // queryClient.invalidateQueries("super-heroes"); < this is a way to refetch data as soon as the mutation is successful
      // however, this is an additional network request.
      // to save a network request we have to do something else.
      //step 2: update query cache using setQueryData. oldQueryData = cached query data
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};
