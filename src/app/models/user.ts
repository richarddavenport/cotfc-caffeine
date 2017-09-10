import * as admin from 'firebase-admin';

export interface UserProfile extends admin.auth.UserRecord {
  updateProfile: boolean;
  editMode: boolean;
  receiveTexts: boolean;
  pushNotifications: boolean;
}
