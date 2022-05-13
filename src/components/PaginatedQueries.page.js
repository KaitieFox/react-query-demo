import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const limit = 2;
const fetchColors = (pageNumber) => {
  return axios.get(
    `http://localhost:4000/colors?_limit=${limit}&_page=${pageNumber}`
  );
};

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, data, isError, error } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  // this will not work because you are only getting a limited data
  //const totalPages = data?.data.length / limit;
  // each page is treated like a new query

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  // so we want to paginate.
  // json server supports pagination
  // for example
  // localhost:4000/colors?_limit=2&_page=3
  // returns 2 at a time, and the third page
  // so let's use these query parameters to implement pagination
  return (
    <>
      <h2>Colors Page</h2>
      {data?.data.map((color) => {
        return (
          <div key={color.id}>
            <h2 style={{ color: `${color.label}` }}>
              {color.id} . {color.label}
            </h2>
          </div>
        );
      })}
      <button
        onClick={() => setPageNumber((page) => page - 1)}
        disabled={pageNumber === 1}
      >
        Previous Page
      </button>
      <button
        onClick={() => setPageNumber((page) => page + 1)}
        disabled={pageNumber === 4}
      >
        Next Page
      </button>
    </>
  );
};
