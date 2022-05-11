// import { useQuery } from "react-query";
// import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

// common pattern with React-Query is to describe the fetch outside the useQuery,
// and use it as a the second argument (see below, useQuery)
// moved to custom hook
// const fetchSuperHeroes = () => {
//   return axios.get("http://localhost:4000/superheroes");
// };

export const RQSuperHeroesPage = () => {
  const [polling, setPolling] = useState(100);

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
    const total = data.length;
    if (total >= 4) {
      return setPolling(false);
    } else {
      setPolling(100);
    }
  };
  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
    if (error) {
      return setPolling(false);
    }
  };
  // The important distinction here is that
  // react-query abstracts away the need to manage state variables
  // thus easier to fetch data in a react component
  // so we're just automatically getting
  // loading, data, errors
  // all that basic api stuff
  // moved to custom hook
  //   const { isLoading, data, isError, error, refetch } = useQuery(
  //     "super-heroes",
  //     fetchSuperHeroes,
  //     // third argument configurations
  //     {
  //       // cacheTime: 5000, (default = 5 minutes)
  //       // staleTime: 30000 < this will prevent triggering background fetches (default = 0)
  //       // refertchOnMount: whenever the component is rendered (default = true)
  //       // refetchOnWindowFocus: when the window is refocused, it refetches and updates the component (default = true)
  //       refetchInterval: polling, //(default = false) This will refetch data at auto intervals. Can set it to number
  //       // refetchIntervalInBackground: fetches even while window is not focused

  //       // how to query on click
  //       // enabled: false, //> first disable the fetch on mount
  //       // refetch (above) is the trigger to manually refetch. Pass it in to an onclick handler

  //       onSuccess,
  //       onError,
  //       select: (data) => {
  //         const superHeroNames = data.data.map((hero) => hero.name);
  //         return superHeroNames;
  //       },
  //     }
  //   );

  //our custom hook!
  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  // react-query automatically retries 3 times before throwing an error.
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* use transformed data from 'select' */}
      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};

// {
//   "id": 4,
//   "name": "Fox",
//   "alterEgo": "Kaitie"
// }
