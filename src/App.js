import React, { useEffect } from 'react'
import Main from './Pages/Main/Main'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Redirect, Route, Switch } from 'react-router-dom'
import Menu from './Pages/Menu/Menu'
import CartModal from './Components/CartModal/CartModal'
import AuthModal from './Components/AuthModal/AuthModal'
import { useDispatch, useSelector } from 'react-redux'
import { autoLogin } from './ReduxStore/actions/authAction'
import AnimationLesson from './Pages/AninationLesson/AnimationLesson'
import Page404 from './Pages/404/Page404'
import AddRestorantOrMenuModal from './Components/AddRestorantOrMenuModal/AddRestorantOrMenuModal'
import AdminOrders from './Pages/AdminOrders/AdminOrders'

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(autoLogin())
  })

  const isAdmin = useSelector(state => state.auth.isAdmin)

  return (
    <>
      <Switch>
        <Route path={'/404'}>
          <Page404/>
        </Route>
        <>
          {isAdmin && <AddRestorantOrMenuModal/>}
          <AuthModal/>
          <CartModal/>
          <Header/>
          <Switch>
            {isAdmin && <Route path={'/admin'}>
              <AdminOrders/>
            </Route>}
            <Route path={'/animation'}>
              <AnimationLesson/>
            </Route>
            <Route path={'/restoraunt/:id'}>
              <Menu/>
            </Route>

            <Route exact path={'/'}>
              <Main/>
            </Route>
            <Redirect to={'/404'}/>
          </Switch>
          <Footer/>
        </>
      </Switch>
    </>

  )
}

export default App
