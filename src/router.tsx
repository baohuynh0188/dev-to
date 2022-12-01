import React from 'react';
import DashboardPage from './pages/admin/DashboardPage';
import PostActionsPage from './pages/admin/Posts/PostActionsPage';
import PostCategoryPage from './pages/admin/Posts/PostCategoryPage';
import PostsPage from './pages/admin/Posts/PostsPage';
import UserActionsPage from './pages/admin/Users/UserActionsPage';
import UsersPage from './pages/admin/Users/UsersPage';
import CategoryPage from './pages/CategoryPage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';

interface IRouter {
  path: string;
  element: any;
}

const router: IRouter[] = [
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/detail/:postId',
    element: <DetailPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/:categories',
    element: <CategoryPage />,
  },
  {
    path: '/admin',
    element: <DashboardPage />,
  },
  {
    path: '/admin/users',
    element: <UsersPage />,
  },
  {
    path: '/admin/users/add',
    element: <UserActionsPage />,
  },
  {
    path: '/admin/users/edit/:userId',
    element: <UserActionsPage isEdit />,
  },
  {
    path: '/admin/posts',
    element: <PostsPage />,
  },
  {
    path: '/admin/posts/edit/:postId',
    element: <PostActionsPage isEdit />,
  },
  {
    path: '/admin/posts/add',
    element: <PostActionsPage />,
  },
  {
    path: '/admin/post-categories',
    element: <PostCategoryPage />,
  },
];

export default router;
