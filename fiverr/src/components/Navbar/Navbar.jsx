
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";
import noAvatar from "../../static/fiver-img/noavatar.jpg";
import { IoIosArrowDown } from "react-icons/io";






function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (



    

          <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link className="link" to="/">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>

        <div className="navbar-links">
          <span className="nav-link explore">Fiverr Pro <IoIosArrowDown /></span>
          <span className="nav-link explore">Explore <IoIosArrowDown />
          </span>
          <span className="nav-link">Services 
          </span>
          {!currentUser?.isSeller && <Link to={"/becomeSeller"}><span className="nav-link">Become a Seller</span> </Link> }
          {currentUser ? (
            <div className="navbar-user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || noAvatar } alt="userImg" />
              <span className="userName">{currentUser?.username} </span>
              {open && (
                <div  className="options">

                  {currentUser.isSeller && (
                    <>
                      <Link className="link link-hover" to="/mygigs">
                        My Gigs
                      </Link>
                      <Link className="link link-hover" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link link-hover" to="/orders">
                    My Purchases
                  </Link>
                  <Link className="link link-hover" to="/messages">
                    Messages
                  </Link>
                  <Link className="link link-hover" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login"  className="nav-link">Sign in</Link>
              <Link  to="/register">
                <button className={active ? "joinBtn" : ""}>Join Now</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/" && currentUser ) && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/gigs/?cat=ai">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
        </>
      )}
    </div>


        

















   
  );
}

export default Navbar;