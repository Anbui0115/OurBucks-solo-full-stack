import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";



const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div>
      <div>
        <div>
          <NavLink to="/" exact={true} activeClassName="active">
            HomeLogo
          </NavLink>
        </div>
        <div>
          <NavLink to="menu" exact={true} activeClassName="active">
            Menu
          </NavLink>
          {/* <div className="profile_button">{sessionLinks}</div> */}
        </div>
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
    </div>
  );
};

export default NavBar;
