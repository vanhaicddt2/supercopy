import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { SocketProvider } from './context/SocketContext';
import NewRouter from './NewRouter';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  // useEffect(() => {
  //   const firstLogin = localStorage.getItem('firstLogin')
  //   if(firstLogin){
  //     const getToken = async () => {
  //       const res = await axios.post('/user/refresh_token', null)
  //       dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
  //     }
  //     getToken()
  //   }
  // },[auth.isLogged, dispatch])

  // useEffect(() => {
  //   if(token){
  //     const getUser = () => {
  //       dispatch(dispatchLogin())

  //       return fetchUser(token).then(res => {
  //         dispatch(dispatchGetUser(res))
  //       })
  //     }
  //     getUser()
  //   }
  // },[token, dispatch])

  return (
    <SocketProvider>
      <Router>
        <div className="App">
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {/* <Header />
          <Body /> */}
          <NewRouter />
        </div>
      </Router>
    </SocketProvider>
  );
}

export default App;
