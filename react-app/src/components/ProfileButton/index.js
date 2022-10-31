import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./ProfileButton.css";
import LogoutButton from "../auth/LogoutButton";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <div onClick={openMenu} className="dropdown-menu">
        Account
      </div>

      {showMenu && (
        <div className="dropdown-content">
          <div
            className="your-listing"
            onClick={() => history.push("/my-customized-items")}
          >
            Your Customized Drinks
          </div>
          <div
            className="your-review"
            onClick={() => history.push("/reviews/current")}
          >
            Your Reviews
          </div>
          <div
            className="your-review"
            onClick={() => history.push("/order")}
          >
            Your current order
          </div>
          <div>
            <LogoutButton />
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
