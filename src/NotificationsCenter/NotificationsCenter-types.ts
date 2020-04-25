import {
  FIFO_REMOVAL_STRATEGY,
  LIFO_REMOVAL_STRATEGY
} from './NotificationsCenter-constants'
import { INotification, TNotificationType } from '../NotificationsContext'
import { ReactNode } from 'react'

export interface INotificationsCenterProps {
  maxNotifications?: number
  maxNotificationsRemovalStrategy?: TMaxNotificationsRemovalStrategy
  defaultDuration?: number | ((notificationType: TNotificationType) => number)
  initialNotifications?: INotification[]
  children?: ReactNode
}

export type TDefaultDuration =
  | number
  | ((notificationType: TNotificationType) => number)

export type TCustomRemovalStrategy = (
  notifications: INotification[]
) => number | INotification

export type TMaxNotificationsRemovalStrategy =
  | typeof FIFO_REMOVAL_STRATEGY
  | typeof LIFO_REMOVAL_STRATEGY
  | TCustomRemovalStrategy
