import React from 'react';
import './app.scss';
// import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer.jsx';
import Orders from './pages/orders/Orders.jsx';
import Gigs from './pages/gigs/Gigs.jsx';
import MyGigs from './pages/myGigs/MyGigs.jsx';
import Gig from './pages/gig/Gig.jsx';
import Messages from './pages/messages/Messages.jsx';
import Message from './pages/message/Message.jsx';
import Add from './pages/add/Add.jsx';
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Success from './pages/success/Success.jsx';
import Pay from './pages/pay/Pay.jsx';
// import BecomeSeller from './pages/BecomeSeller/BecomeSeller.jsx';


function App() {
  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </>
    )

  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/gigs",
          element: <Gigs />
        },
        {
          path: "/gig/:id",
          element: <Gig />
        },
        {
          path: "/orders",
          element: <Orders />
        },
        {
          path: "/mygigs",
          element: <MyGigs />
        },
        {
          path: "/add",
          element: <Add />
        },
        {
          path: "/messages",
          element: <Messages />
        },
        {
          path: "/message/:id",
          element: <Message />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/success",
          element: <Success />
        },
        {
          path: "/pay/:id",
          element: <Pay />
        },
        // {
        //   path: "/becomeSeller",
        //   element: <BecomeSeller />
        // },

      ]
    },
  ]);



  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
