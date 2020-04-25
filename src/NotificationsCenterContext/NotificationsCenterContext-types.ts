import { TNotificationType } from '../NotificationsContext'
import { ReactNode } from 'react'

export interface INotificationsCenter {
  notify: (
    type: TNotificationType,
    content: ReactNode,
    specificDurationInMs?: number
  ) => void
  notifySuccess: (content: ReactNode, specificDurationInMs?: number) => void
  notifyWarning: (content: ReactNode, specificDurationInMs?: number) => void
  notifyInfo: (content: ReactNode, specificDurationInMs?: number) => void
  notifyError: (content: ReactNode, specificDurationInMs?: number) => void
  clearAllNotifications: () => void
}
