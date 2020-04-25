import {
  TDefaultDuration,
  TMaxNotificationsRemovalStrategy
} from './NotificationsCenter-types'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import generate from 'shortid'
import {
  ERROR_TYPE,
  INFO_TYPE,
  INotification,
  SUCCESS_TYPE,
  TNotificationType,
  WARNING_TYPE
} from '../NotificationsContext'
import { INotificationsCenter } from '../NotificationsCenterContext'
import { isFunction, isNumber } from 'ts-util-is'
import {
  LIFO_REMOVAL_STRATEGY,
  UNLIMITED_DURATION
} from './NotificationsCenter-constants'
import { useFinalAttribute, useIsMounted } from '@manzano/component-utils'
import { toEffectiveDuration } from './NotificationsCenter-utils'

export function useController(
  maxNotifications?: number,
  maxNotificationsRemovalStrategy?: TMaxNotificationsRemovalStrategy,
  defaultDuration?: TDefaultDuration,
  initialNotifications: INotification[] = []
) {
  const isMounted = useIsMounted()
  const timeoutIds = useFinalAttribute(() => new Set<number>())
  const [notifications, setNotifications] = useState(initialNotifications)

  const cancelScheduledRemovals = () => {
    timeoutIds.forEach((timeoutId) => {
      window.clearTimeout(timeoutId)
    })
  }

  const notificationsCenter = useMemo((): INotificationsCenter => {
    const notify = (
      type: TNotificationType,
      content: ReactNode,
      specificDuration?: number
    ) => {
      let timeoutId: number | undefined
      const duration = toEffectiveDuration(
        type,
        specificDuration,
        defaultDuration
      )

      const removeNotification = () => {
        setNotifications((notifications) =>
          notifications.filter(
            (currentNotification) => notification !== currentNotification
          )
        )
      }

      const notification: INotification = {
        type,
        content,
        id: generate(),
        remove: () => {
          removeNotification()

          if (isNumber(timeoutId)) {
            window.clearTimeout(timeoutId)
            timeoutIds.delete(timeoutId)
          }
        }
      }

      if (duration !== UNLIMITED_DURATION) {
        timeoutId = window.setTimeout(() => {
          if (isMounted()) {
            removeNotification()
            timeoutIds.delete(timeoutId!)
          }
        }, duration)

        timeoutIds.add(timeoutId)
      }

      setNotifications((notifications) => {
        if (
          isNumber(maxNotifications) &&
          notifications.length >= maxNotifications
        ) {
          if (isFunction(maxNotificationsRemovalStrategy)) {
            const itemToRemove = maxNotificationsRemovalStrategy(notifications)

            if (isNumber(itemToRemove)) {
              notifications = notifications.filter(
                (currentItem, i) => i !== itemToRemove
              )
            } else {
              notifications = notifications.filter(
                (currentItem) => currentItem !== itemToRemove
              )
            }
          } else if (
            maxNotificationsRemovalStrategy === LIFO_REMOVAL_STRATEGY
          ) {
            notifications = notifications.slice(1)
          } else {
            notifications = notifications.slice(0, notifications.length - 1)
          }
        }

        return [notification, ...notifications]
      })
    }

    return {
      notify,
      notifyError: (content, specificDurationInMs) =>
        notify(ERROR_TYPE, content, specificDurationInMs),
      notifyInfo: (content, specificDurationInMs) =>
        notify(INFO_TYPE, content, specificDurationInMs),
      notifySuccess: (content, specificDurationInMs) =>
        notify(SUCCESS_TYPE, content, specificDurationInMs),
      notifyWarning: (content, specificDurationInMs) =>
        notify(WARNING_TYPE, content, specificDurationInMs),
      clearAllNotifications: () => {
        cancelScheduledRemovals()
        timeoutIds.clear()
        setNotifications([])
      }
    }
  }, [maxNotifications, maxNotificationsRemovalStrategy, defaultDuration])

  useEffect(() => cancelScheduledRemovals, [])

  return { notifications, notificationsCenter }
}
