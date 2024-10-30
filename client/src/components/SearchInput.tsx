import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  setEntity,
  setPage,
  setResults,
  setStatus,
} from "../redux/slices/searchSlice";
import { RootState } from "../redux/store";
import searchIcon from "../assets/icon-search.svg";

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const { query, entity } = useSelector((state: RootState) => state.search);

  const handleInitState = () => {
    dispatch(setPage(1));
    dispatch(setResults([]));
    dispatch(setStatus("initial"));
  };

  const handleQueryChange = (inputValue: string) => {
    handleInitState();
    dispatch(setQuery(inputValue));
  };

  return (
    <div className="input-container">
      <img src={searchIcon} alt="search-icon" className="search-icon" />
      <input
        className="input"
        type="text"
        placeholder="Start typing to search..."
        onChange={(e: any) => handleQueryChange(e.target.value)}
        value={query}
        autoFocus
      />
      <select
        className="select"
        value={entity}
        onChange={(e) => {
          dispatch(setEntity(e.target.value as "users" | "repositories"));
          handleInitState();
        }}
      >
        <option value="users">User</option>
        <option value="repositories">Repository</option>
      </select>
    </div>
  );
};

export default SearchInput;
