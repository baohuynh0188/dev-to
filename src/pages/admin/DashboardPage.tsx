import React from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';

const DashboardPage = () => {
  return (
    <AdminLayout title='Dashboard'>
      <div className='card mb-4'>
        <div className='card-body'>
          When scrolling, the navigation stays at the top of the page. This is
          the end of the static navigation demo.
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
