import { createContext } from '@manzano/component-utils'
import { INotificationsCenter } from './NotificationsCenterContext-types'

const [NotificationsCenterProvider, useNotificationsCenter] = createContext<
  INotificationsCenter
>()

export { NotificationsCenterProvider, useNotificationsCenter }
