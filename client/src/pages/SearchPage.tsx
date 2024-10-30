import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";

import { RootState } from "../redux/store";
import { setPage, setResults, setStatus } from "../redux/slices/searchSlice";
import UserCard from "../components/UserCard";
import RepositoryCard from "../components/RepositoryCard";
import SearchInput from "../components/SearchInput";
import Header from "../components/Header";
import { initial } from "lodash";

const PER_PAGE = 15; // Items per page

const SearchPage: React.FC = () => {
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);
  const { query, entity, results, status, page } = useSelector(
    (state: RootState) => state.search
  );

  const fetchResults = async (
    pageNum = 1,
    query: string,
    results: any[],
    entity: string,
    signal: AbortSignal
  ) => {
    dispatch(setStatus("loading"));
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/search/`,
        {
          entity,
          query,
          per_page: PER_PAGE,
          page: pageNum,
        },
        { signal }
      );

      const items = response.data.items;
      if (query.length < 3) dispatch(setResults([]));
      else {
        // Determine if there are more results available
        setHasMore(items.length === PER_PAGE);

        // Append or reset results based on page number
        dispatch(setResults([...results, ...items]));
      }
      dispatch(setStatus("idle"));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(setStatus("idle"));
      } else {
        dispatch(setStatus("failed"));
      }
    }
  };

  // Debounced function to update query from inputQuery
  const debouncedFetchResults = useCallback(
    debounce((query, page, results, entity, signal) => {
      if (query.length >= 3) {
        fetchResults(page, query, results, entity, signal); // Always start from the first page when a new query is made
      } else {
        dispatch(setResults([])); // Clear results if query is less than 3
        setHasMore(false);
      }
    }, 1000),
    []
  );

  // Trigger search on query or entity change
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    if (query.length >= 3) {
      debouncedFetchResults(query, page, results, entity, signal);
    } else {
      // Clear results if query is less than 3 characters
      dispatch(setResults([]));
      setHasMore(false);
      controller.abort();
    }
    // Cleanup function to cancel the request when the component unmounts
    return () => controller.abort();
  }, [query, entity, page, debouncedFetchResults, dispatch]);

  // Function to load more results on scroll
  const loadMore = () => dispatch(setPage(page + 1));

  return (
    <div className="container">
      <Header />
      <SearchInput />
      {status === "loading" && <p className="status-text">Loading...</p>}
      {status === "failed" && (
        <p className="status-text">Error loading results.</p>
      )}
      <InfiniteScroll
        style={{ width: "100%" }}
        dataLength={results.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <p className="status-text">
            {status !== "initial" ? "Loading more results..." : ""}
          </p>
        }
        endMessage={
          <p className="status-text">
            {query.length > 0 && status === "idle" && !hasMore
              ? "No more results"
              : ""}
          </p>
        }
      >
        <div className="results-grid">
          {entity === "users"
            ? results.map((user) => <UserCard key={user.id} user={user} />)
            : results.map((repo) => (
                <RepositoryCard key={repo.id} repo={repo} />
              ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default SearchPage;
