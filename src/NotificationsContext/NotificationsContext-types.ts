import {
  ERROR_TYPE,
  INFO_TYPE,
  SUCCESS_TYPE,
  WARNING_TYPE
} from './NotificationsContext-constants'
import { ReactNode } from 'react'

export interface INotification {
  id: string
  type: TNotificationType
  content: ReactNode
  remove: () => void
}

export type TNotificationType =
  | typeof SUCCESS_TYPE
  | typeof INFO_TYPE
  | typeof WARNING_TYPE
  | typeof ERROR_TYPE
