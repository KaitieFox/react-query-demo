import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Fragment } from "react";

// useInfiniteQuery injects a couple of values into the fetcher function
const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueriesPage = () => {
  const {
    isLoading,
    data,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    // this returns a value `hasNextPage` which determines if there is a next page or not
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Infinite Colors Page</h2>
      {/* useInfiniteQuery returns data in a different way. Now, `pages`, and see rest of differences */}
      {data?.pages.map((group, index) => {
        return (
          <Fragment key={index}>
            {group.data.map((color) => {
              return (
                <h2 style={{ color: `${color.label}` }} key={color.id}>
                  {color.id} . {color.label}
                </h2>
              );
            })}
          </Fragment>
        );
      })}
      <button onClick={fetchNextPage} disabled={!hasNextPage}>
        Load More
      </button>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};
