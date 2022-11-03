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
          <div className={styles.left_nav}>
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

            <NavLink to="/menu" exact={true} activeClassName="active">
              <div className={styles.menu_text}>Menu</div>
            </NavLink>
          </div>

          <div className={styles.right_bar}>
            {!sessionUser && (
              <div className={styles.login_signup}>
                <div className={styles.login}>
                  <NavLink to="/login" exact={true} activeClassName="active">
                    Login
                  </NavLink>
                </div>
                <div className={styles.signup}>
                  <NavLink to="/sign-up" exact={true} activeClassName="active">
                    Sign Up
                  </NavLink>
                </div>
              </div>
            )}
            <div className={styles.login_signup}>
              {sessionUser && (
                <div className={styles.login}>
                  <ProfileButton />
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
