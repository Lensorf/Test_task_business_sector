import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import SearchTable from './components/searchTable/SearchTable';
import Pagination from './components/Pagination/Pagination';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [sortConfig, setSortConfig] = useState(posts); // конфиг для сортировки
  const [currentPage, setCurrentPage] = useState(1); // задавание первой страницы таблицы
  const [postsPerPage] = useState(10); // количество постов на странице

  const dispatch = useDispatch();
  const { sortedPosts } = useSelector((store) => store.globalStore);

  // ------------получение постов ------------------
  useEffect(() => {
    window.scroll(0, 0);
    fetch('https://jsonplaceholder.typicode.com/posts ')
      .then((data) => data.json())
      .then((data) => {
        dispatch({ type: 'SET_POSTS', payload: data });
        setPosts(data);
      })
      .catch(console.error);
  }, []);

  // ----------------- Pagination -------------------
  const maxPage = Math.ceil(posts.length / postsPerPage);
  const postsLastIndex = currentPage * postsPerPage;
  const postsFirstIndex = postsLastIndex - postsPerPage;
  const currentPosts = sortedPosts?.slice(postsFirstIndex, postsLastIndex);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // -------------------------------------------------

  // ------------------- Sorted ----------------------
  const requestSort = (key) => {
    let direction = 'ascending';
    console.log(key);
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  useMemo(() => {
    if (sortConfig !== null) {
      sortedPosts?.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return posts;
  }, [sortedPosts, sortConfig]);
  // -------------------------------------------------

  return (
    <div className="BlockTable">
      <SearchTable
        currentPage={currentPage}
        posts={posts}
      />
      <table className="table">
        <thead id="thead">
          <tr>
            <th id="textThead" scope="col">
              <div className="blockButton">
                ID
                <button
                  className="buttonSort"
                  type="button"
                  onClick={() => requestSort('id')}
                >
                  <img src="Group_1.svg" alt="Galochka" />
                </button>
              </div>
            </th>
            <th id="textThead" scope="col">
              <div className="blockButton">
                Заголовок
                <button className="buttonSort" type="button" onClick={() => requestSort('title')}>
                  <img src="Group_1.svg" alt="Galochka" />
                </button>
              </div>
            </th>
            <th id="textThead" scope="col">
              <div className="blockButton">
                Описание
                <button className="buttonSort" type="button" onClick={() => requestSort('body')}>
                  <img src="Group_1.svg" alt="Galochka" />
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPosts?.map((post) => (
            <tr key={post.id}>
              <th className="postId">{post.id}</th>
              <td className="postTitle">{post.title}</td>
              <td className="postBody">{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="PaginationBlock">
        <Pagination
          maxPage={maxPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postsPerPage={postsPerPage}
          totalPosts={sortedPosts?.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
