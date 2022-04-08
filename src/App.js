import React, { useState, useEffect, useRef } from 'react';
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getSingleUser } from './actions/userActions';
import ReactPaginate from "react-paginate";

function App() {
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const count = useRef(0);
  const dispatch = useDispatch();

  const { usersLoading, users, usersError} = useSelector(state=> state.UsersList);
  const { singleUserLoading, singleUser} = useSelector(state=> state.singleUser);

  useEffect(() => {
    dispatch(getAllUsers(1));
  }, [dispatch]);

  useEffect(() => {
    if(usersLoading === false){
      if(users.total > 0){
        setItems(users.data);
        if(count.current === 0){
          setpageCount(users.total_pages);
          count.current = 10;
        }
      }
    }
  }, [dispatch, usersLoading, users, usersError]);

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    dispatch(getAllUsers(currentPage));
  };

  const handleCardClick = (id) => {
    dispatch(getSingleUser(id));
  };

  return (
    <div className="container pt-4">

    <div className="custom-card detail-view">
      <div className="card-body d-flex justify-content-center align-items-center">
        {singleUserLoading === false && Object.entries(singleUser).length > 0 ? <div className='text-center'>
            <img src={singleUser.avatar} width="256" height="256" alt="user"/>
            <h4>First Name: <span className='card-text-color'>{singleUser.first_name}</span></h4>
            <h4>Last Name: <span className='card-text-color'>{singleUser.last_name}</span></h4>
            <h4>Email Id: <span className='card-text-color'>{singleUser.email}</span></h4>
          </div> : 
          singleUserLoading === true ? <div><span className="spinner-border text-primary"></span> Loading...</div> :
          <h4>Click any card to view user details.</h4>
        }
      </div>
    </div>

      <div className="d-flex justify-content-evenly flex-wrap my-3">
        {usersLoading === false ? items.map((item) => {
          return (
            <div key={item.id} className={`m-3 clickable-card ${singleUser && item.id === singleUser.id ? 'clickable-card-active' : '' }`} style={{width: 10+'rem'}} onClick={e=> handleCardClick(item.id)}>
              <img src={item.avatar} className="card-img-top" style={{minHeight: 158+'px'}} alt="user"/>
              <div className='card-body'>
                <p className='card-text'>{item.first_name} {item.last_name}</p>
              </div>
            </div>
          );
        }) : <div className='text-center'><span className="spinner-border text-primary"></span> Loading...</div> }
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;