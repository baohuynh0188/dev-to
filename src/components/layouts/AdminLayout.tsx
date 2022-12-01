import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/AdminLayout.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { logout } from '../../redux/slices/authSlice';
import SideNav from '../SideNav';

interface IAdminLayout {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: IAdminLayout): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.ma_nhom_nhan_vien !== 'admin') {
      return navigate('/');
    }
  }, [navigate, userInfo]);

  const onLogoutClick = (): void => {
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <>
      <nav className='sb-topnav navbar navbar-expand navbar-dark bg-dark'>
        <Link className='navbar-brand ps-3' to='/admin'>
          Admin
        </Link>
        <button
          className='btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0'
          id='sidebarToggle'
        >
          <i className='fas fa-bars'></i>
        </button>
        <div className='d-none d-md-inline-block ms-auto me-0 me-md-3 my-2 my-md-0 text-white'>
          {userInfo?.ten_tai_khoan}
        </div>
        <ul className='navbar-nav ms-auto ms-md-0 me-3 me-lg-4'>
          <li className='nav-item dropdown'>
            <div
              className='nav-link dropdown-toggle'
              id='navbarDropdown'
              role='button'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <i className='fas fa-user fa-fw'></i>
            </div>
            <ul
              className='dropdown-menu dropdown-menu-end'
              aria-labelledby='navbarDropdown'
            >
              <div>
                <li>
                  <Link className='dropdown-item' to='/admin/profile'>
                    Profile
                  </Link>
                </li>
                <li>
                  <hr className='dropdown-divider' />
                </li>
                <li>
                  <Button className='dropdown-item' onClick={onLogoutClick}>
                    Logout
                  </Button>
                </li>
              </div>
            </ul>
          </li>
        </ul>
      </nav>
      <div id='layoutSidenav'>
        <SideNav />
        <div id='layoutSidenav_content'>
          <main>
            <div className='container-fluid px-4'>
              <h1 className='mt-4'>{title}</h1>
              {children}
            </div>
          </main>
          <footer className='py-4 bg-light mt-auto'>
            <div className='container-fluid px-4'>
              <div className='d-flex align-items-center justify-content-between small'>
                <div className='text-muted'>Copyright &copy; Dev.to 2022</div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
