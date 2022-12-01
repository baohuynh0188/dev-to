import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <div id='layoutSidenav_nav'>
      <nav
        className='sb-sidenav accordion sb-sidenav-dark'
        id='sidenavAccordion'
      >
        <div className='sb-sidenav-menu'>
          <div className='nav'>
            <div className='sb-sidenav-menu-heading'>Core</div>
            <Link className='nav-link' to='/admin'>
              <div className='sb-nav-link-icon'>
                <i className='fas fa-tachometer-alt'></i>
              </div>
              Dashboard
            </Link>
            <div className='sb-sidenav-menu-heading'>Management</div>
            <div
              className='nav-link collapsed'
              data-bs-toggle='collapse'
              data-bs-target='#collapsePosts'
              aria-expanded='false'
              aria-controls='collapsePosts'
            >
              <div className='sb-nav-link-icon'>
                <i className='fas fa-columns'></i>
              </div>
              Posts
              <div className='sb-sidenav-collapse-arrow'>
                <i className='fas fa-angle-down'></i>
              </div>
            </div>
            <div
              className='collapse'
              id='collapsePosts'
              aria-labelledby='headingOne'
              data-bs-parent='#sidenavAccordion'
            >
              <nav className='sb-sidenav-menu-nested nav'>
                <Link className='nav-link' to='/admin/posts'>
                  List Post
                </Link>
              </nav>
              <nav className='sb-sidenav-menu-nested nav'>
                <Link className='nav-link' to='/admin/posts/add'>
                  Add a post
                </Link>
              </nav>
              <nav className='sb-sidenav-menu-nested nav'>
                <Link className='nav-link' to='/admin/post-categories'>
                  Categories
                </Link>
              </nav>
            </div>
            <div
              className='nav-link collapsed'
              data-bs-toggle='collapse'
              data-bs-target='#collapseUsers'
              aria-expanded='false'
              aria-controls='collapseUsers'
            >
              <div className='sb-nav-link-icon'>
                <i className='fas fa-columns'></i>
              </div>
              Users
              <div className='sb-sidenav-collapse-arrow'>
                <i className='fas fa-angle-down'></i>
              </div>
            </div>
            <div
              className='collapse'
              id='collapseUsers'
              aria-labelledby='headingOne'
              data-bs-parent='#sidenavAccordion'
            >
              <nav className='sb-sidenav-menu-nested nav'>
                <Link className='nav-link' to='/admin/users'>
                  List User
                </Link>
              </nav>
              <nav className='sb-sidenav-menu-nested nav'>
                <Link className='nav-link' to='/admin/users/add'>
                  Add a user
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
