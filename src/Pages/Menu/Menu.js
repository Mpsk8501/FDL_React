import React, {useEffect} from 'react';
import RestorauntMenu from "../../Components/RestorauntMenu/RestorauntMenu";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchRestorants} from "../../ReduxStore/actions/restorantsAction";
import Loader from "../../Components/Loader/Loader";


const Menu = () => {

  let id = useParams().id;
  const dispatch = useDispatch();
  const loading = useSelector(state => state.restorants.loading);
  const restorants = useSelector(state => state.restorants.restorants);
  let restoran = {};
  restorants.forEach((item) => {
    if (item.id === id) {
      restoran = item
    }
  });

  useEffect(() => {
    if (!restorants.length) {
      dispatch(fetchRestorants())
    }
  }, [dispatch, restorants]);


  return (
      <div className={'main'}>
        {loading || !restorants.length
            ? <Loader/>
            : <RestorauntMenu
                cards={restoran.menu}
                header={restoran.menuHeader}/>
        }
      </div>
  );
};

export default Menu;