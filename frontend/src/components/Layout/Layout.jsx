import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router'
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';

import NavbarBlock from '../Navigation/Navbar'

const Layout = () => {
  const { t } = useTranslation()

  const notification = useSelector(state => state.notifications.notification)
  console.log('notification', notification)
  
  useEffect(() => {
    if(notification?.type) {
      toast[notification.type](
        <div>
          {notification?.eventTitlePath && <b>{t(notification.eventTitlePath)}</b>}
          <div>{t(notification.path)}</div>
        </div>,
        { className: 'p-3', closeOnClick: true }
      );
    }
  }, [notification]);

  return (
    <div className="d-flex flex-column h-100">
      <NavbarBlock />
      <Outlet />
      <ToastContainer limit={3} />
    </div>
  )
}

export default Layout
