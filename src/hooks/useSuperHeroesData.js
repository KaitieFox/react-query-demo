import { useQuery, useMutation, useQueryClient } from "react-query";
// import axios from "axios";
//for axios interceptor, use this import
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  // return axios.get("http://localhost:4000/superheroes");
  return request({ url: "/superheroes" });
};

const addSuperHero = (hero) => {
  // return axios.post("http://localhost:4000/superheroes", hero);
  return request({ url: "/superheroes", method: "post", data: hero });
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

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    /** OPTIMISTIC UPDATING */
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      // so this updates the list of heroes on the UI before even making the post request.
      // that's the optimism!
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      // this is to roll back data in case the network request errors out
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      // this is the rollback function on error
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      // refetch from the server.
      // the user will notice nothing. the fetch occurs in the background and simply syncs the data
      queryClient.invalidateQueries("super-heroes");
    },

    /** INVALIDATE QUERY, OR UPDATE QUERY CACHE */
    // //steps to not making an additional network request once mutation succeeds:
    // // step 1: use param 'data' (which is the entire response for post request)
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes"); < this is a way to refetch data as soon as the mutation is successful
    //   // however, this is an additional network request.
    //   // to save a network request we have to do something else.
    //   //step 2: update query cache using setQueryData. oldQueryData = cached query data
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    // });
    // },
  });
};
