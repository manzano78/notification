import { createContext } from '@manzano/component-utils'
import { INotification } from './NotificationsContext-types'

const [NotificationsProvider, useNotifications] = createContext<
  INotification[]
>()

export { NotificationsProvider, useNotifications }
