import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import styles from "./NavBar.module.css";
import logo from "./logo/OurBucks.png";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div className={styles.outer_most}>
      <div className={styles.outer_nav}>
        <nav className={styles.nav_bar}>
          <div className={styles.left_bar}>
            <div className={styles.nav_logo}>
              <NavLink to="/" exact={true} activeClassName="active">
                <img
                  className={styles.home_logo}
                  src={logo}
                  alt="logo"
                  width={"80px"}
                  height={"40px"}
                ></img>
              </NavLink>
            </div>
            <div>
              <NavLink to="/menu" exact={true} activeClassName="active">
                Menu
              </NavLink>
            </div>
          </div>
          <div className={styles.right_bar}>
            {!sessionUser && (
              <div>
                <div>
                  <NavLink to="/login" exact={true} activeClassName="active">
                    Login
                  </NavLink>
                </div>
                <div>
                  <NavLink to="/sign-up" exact={true} activeClassName="active">
                    Sign Up
                  </NavLink>
                </div>
              </div>
            )}

            {sessionUser && (
              <div>
                <ProfileButton />
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
