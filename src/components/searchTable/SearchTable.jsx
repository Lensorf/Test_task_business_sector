/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './searchTable.css';

export default function searchTable({ posts, currentPage }) {
  const dispatch = useDispatch();

  const [input, setInput] = useState('');
  const { sortedPosts } = useSelector((store) => store.globalStore);

  const arrayKey = (posts.map((post) => Object.keys(post)))[0];

  const filtredPosts = posts?.filter((post) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arrayKey.length; i++) {
      const pos = post?.[arrayKey[i]].toString();
      if (pos.toLowerCase().includes(input.toLowerCase())) {
        return post;
      }
    }
  });

  return (
    <div>
      <form className="formSearch" role="search" onSubmit={(e) => e.preventDefault()}>
        <input className="searchInput" type="search" placeholder="Поиск" aria-label="Search" onChange={(event) => setInput(event.target.value)} />
        {/* <Link className="buttonLink" type="button" to={currentPage} onClick={() => dispatch({ type: 'SET_POSTS', payload: filtredPosts })}>Search</Link> */}
        <Link className="buttonLink" type="button" to={currentPage} onClick={() => dispatch({ type: 'SET_POSTS', payload: filtredPosts })}><img className="buttonLink" src="search-svgrepo-com_1.svg" alt="scope" /></Link>
      </form>
    </div>
  );
}
