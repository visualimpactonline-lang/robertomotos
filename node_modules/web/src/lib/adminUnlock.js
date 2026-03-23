const ADMIN_UNLOCK_KEY = 'rp-motos-admin-unlocked';

export function unlockAdmin() {
  localStorage.setItem(ADMIN_UNLOCK_KEY, 'true');
}

export function isAdminUnlocked() {
  return localStorage.getItem(ADMIN_UNLOCK_KEY) === 'true';
}
