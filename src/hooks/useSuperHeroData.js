import { useQuery } from "react-query";
import axios from "axios";

// const fetchSuperHero = (heroId) => {
//   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
// };

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  //useQuery can get a variable from the query id (frist param)
  // so instead of passing down heroId, we can just call it in the fetch
  // return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));
  return useQuery(["super-hero", heroId], fetchSuperHero);
};
