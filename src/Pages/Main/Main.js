import React, {useEffect} from 'react';
import Promo from "../../Components/Promo/Promo";
import Restoraunts from "../../Components/Restoraunts/Restoraunts";
import {useDispatch, useSelector} from "react-redux";
import {fetchRestorants} from "../../ReduxStore/actions/restorantsAction";

const Main = () => {

  const dispatch = useDispatch();
  const loading = useSelector(state=>state.restorants.loading);
  const cards = useSelector(state=>state.restorants.restorants);

  useEffect(()=>{
    if(!cards.length){
      dispatch(fetchRestorants());
    }
  },[dispatch,cards.length]);



  return (
        <div className={'main'}>
          <Promo/>
          <Restoraunts loading={loading} cards={cards}/>
        </div>

  );
};

export default Main;