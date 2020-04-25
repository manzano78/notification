import { TNotificationType } from '../NotificationsContext'
import { TDefaultDuration } from './NotificationsCenter-types'
import { UNLIMITED_DURATION } from './NotificationsCenter-constants'
import { isFunction, isNumber } from 'ts-util-is'

export function toEffectiveDuration(
  notificationType: TNotificationType,
  specificDuration?: number,
  defaultDuration: TDefaultDuration = UNLIMITED_DURATION
) {
  if (isNumber(specificDuration)) {
    return specificDuration
  }

  return isFunction(defaultDuration)
    ? defaultDuration(notificationType)
    : defaultDuration
}
