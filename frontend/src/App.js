import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AppLayout from './pages/AppLayout';
import { Product } from './pages/Product';
import { Category } from './pages/Category';



function App() {


  const router = createBrowserRouter([
    {
      path: '/signin',
      element: <SignIn/>
    },
    {
      path: '/signup',
      element: <SignUp/>
    },
    {
      path: '/',
      element: <AppLayout/>,
      children:[
        {
          path: 'product',
          element: <Product/>
        },
        {
          path: 'category',
          element: <Category/>
        }
      ]
    }
  ]);

  return (
    <>
    <ToastContainer />
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
