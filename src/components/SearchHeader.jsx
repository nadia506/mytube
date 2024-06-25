import React, { useEffect, useState } from "react";
import { BsYoutube, BsSearch } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { HiMoon, HiSun } from "react-icons/hi";

export default function SearchHeader() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/videos/${search}`);
  };

  useEffect(() => {
    setSearch(keyword || "");
  }, [keyword]);

  return (
    <header className="w-full flex p-4 text-2xl border-b border-zinc-600 mb-4">
      <Link to="/" className="flex items-center">
        <BsYoutube className="text-4xl text-brand" />
        <h1 className="font-bold ml-2 text-3xl">Mytube</h1>
      </Link>
      <form className="w-full flex justify-center" onSubmit={handleSubmit}>
        <input
          className="w-7/12 p-2 outline-none dark:bg-black border border-black-50 dark:border-none text-balck-50 dark:text-gray-50"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-zinc-600 px-4">
          <BsSearch />
        </button>
      </form>
      <div className="ml-auto flex items-center">
        <button
          onClick={toggleDarkMode}
          className="text-2xl text-zinc-600 hover:text-zinc-300 focus:outline-none pr-4"
        >
          {darkMode && <HiSun />}
          {!darkMode && <HiMoon />}
        </button>
      </div>
    </header>
  );
}
