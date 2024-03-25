import React, {useEffect} from 'react';
import {Helmet} from "react-helmet";
import AboutItem from "../../../components/users/AboutItem";
import LoadingPage from "../../../components/LoadingPage";
import {useDispatch, useSelector} from "react-redux";
import {usersListRequest} from "../../../store/action/users";
import {useNavigate, useParams} from "react-router-dom";
import ReactPaginate from "react-paginate";

const Users = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector(state => state.users.loading);
    const list = useSelector(state => state.users.usersList);
    const pages = useSelector(state => state.users.pages);
    const { page = 1 } = useParams();

    useEffect(()=>{
        dispatch(usersListRequest({page}))
    },[page])

    return (
        <div className={'users childrenWidth'}>
            <Helmet>
                <title>users</title>
            </Helmet>
            <div className="cont_cat">
                {
                    loading ? <LoadingPage/>
                        : list.map(item => <AboutItem key={item.id} item={item}/>)
                }
                <div className={"pages-list"}>
                    <ReactPaginate
                        activeClassName={'item active '}
                        breakClassName={'item break-me '}
                        breakLabel={'...'}
                        containerClassName={'pagination'}
                        disabledClassName={'disabled-page'}
                        marginPagesDisplayed={2}
                        nextClassName={"item next "}
                        nextLabel={">"}
                        initialPage={page - 1}
                        onPageChange={(ev) => navigate(`/users/${ev.selected + 1}`)}
                        pageCount={pages}
                        pageClassName={'item pagination-page '}
                        pageRangeDisplayed={2}
                        previousClassName={"item previous"}
                        previousLabel={"<"} />
                </div>
            </div>

        </div>
    );
};

export default Users;
