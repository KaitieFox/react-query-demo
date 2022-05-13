import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

// const fetchSuperHero = (heroId) => {
//   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
// };

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  // this upper part is more advanced: useQueryClient
  // we're going to use data already fetched to render the details page
  // while making a query call in the background to fetch the rest of the data.
  const queryClient = useQueryClient();

  //useQuery can get a variable from the query id (frist param)
  // so instead of passing down heroId, we can just call it in the fetch
  // return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));
  // return useQuery(["super-hero", heroId], fetchSuperHero);

  //we update this call to use the queryClient. Third argument
  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined; //important to specify in order to trigger loading state
      }
    },
  });
};
