import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import API from '../utils/API';

export default function HeaderNavigation(props) {
  const {
    user: { roles, login },
    setUserData,
    setLoading,
  } = props;
  const history = useHistory();
  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const result = await API.get('users/profile', {
        withCredentials: true,
      }).catch((e) => {
        if (e.response.status === 401) {
          history.push('/login');
        }
      });
      setUserData(result.data.id, result.data.username, result.data.role);
      setLoading(false);
    };
    getUserData();
  }, []);
  async function onLogoutClick() {
    setUserData('', '', []);
    history.push('/login');
    await API.post('users/logout', {
      withCredentials: true,
    });
  }
  function NavigationBar() {
    return (
      <>
        {roles.includes('client') && (
          <>
            <Link className="links__item" to="/products">
              Product
            </Link>
            <Link className="links__item" to="/orders">
              Orders
            </Link>
          </>
        )}
        {roles.includes('courier') && (
          <>
            <Link className="links__item" to="/deliveries">
              Delivery
            </Link>
            <Link className="links__item" to="/orders?lala=lolo">
              Requests
            </Link>
          </>
        )}
        {login.length > 0 && (
          <>
            <div className="links__profile">
              <Link className="profile__name" to="/deliveries">
                {login}
              </Link>
              <FaUserAlt className="profile__icon" />
              <IoMdLogOut onClick={onLogoutClick} className="profile__logout" />
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <header className="header">
      <nav className="header__links">
        <div className="links__item">Logo</div>
        <NavigationBar />
        {/* <div className="links__profile">
          <Link className="profile__name" to="/deliveries">
            {login}
          </Link>
          <FaUserAlt className="profile__icon" />
          <IoMdLogOut className="profile__logout" />
        </div> */}
      </nav>
    </header>
  );
}
