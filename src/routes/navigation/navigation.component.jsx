import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { setCurrentUser } from "../../store/user/user.action";

import "./navigation.styles.css";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, setLogout] = useState(true);

  useEffect(() => {
    if (!logout) {
      dispatch(setCurrentUser({}));
      navigate("/login");
    }
  }, [logout]);

  const handleLogoutClick = () => {
    setLogout(!logout);
  };
  return (
    <Fragment>
      <div className="navigation-container">
        <div className="logout-container">
          <Link onClick={handleLogoutClick}>Logout</Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
