import React from 'react'
import { INotificationsCenterProps } from './NotificationsCenter-types'
import { useController } from './NotificationsCenter-controller'
import { NotificationsCenterProvider } from '../NotificationsCenterContext'
import { NotificationsProvider } from '../NotificationsContext'

export function NotificationsCenter(props: INotificationsCenterProps) {
  const {
    children,
    defaultDuration,
    initialNotifications,
    maxNotifications,
    maxNotificationsRemovalStrategy
  } = props

  const { notifications, notificationsCenter } = useController(
    maxNotifications,
    maxNotificationsRemovalStrategy,
    defaultDuration,
    initialNotifications
  )

  return (
    <NotificationsProvider value={notifications}>
      <NotificationsCenterProvider value={notificationsCenter}>
        {children}
      </NotificationsCenterProvider>
    </NotificationsProvider>
  )
}
