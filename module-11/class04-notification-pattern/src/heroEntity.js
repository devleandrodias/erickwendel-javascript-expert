import { NotificationContext } from './notificationContext.js'

export class HeroEntity extends NotificationContext {
  constructor({ name, age }) {
    super()

    this.age = age;
    this.name = name;
  }

  isValid() {
    if (this.age < 20) {
      this.addNotification('Age must be greater than 20')
    }

    if (this.name?.length < 3) {
      this.addNotification('Name must be at least 3 characters')
    }

    return !this.hasNotifications()
  }
}