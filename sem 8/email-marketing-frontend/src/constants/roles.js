export const ROLES = {
  ADMIN: "workspace_admin",
  MARKETER: "marketer",
  VIEWER: "viewer",
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: {
    canInvite: true,
    canChangeRole: true,
    canViewInvitations: true,
    canAccessTeam: true,
  },
  [ROLES.MARKETER]: {
    canInvite: false,
    canChangeRole: false,
    canViewInvitations: false,
    canAccessTeam:false,
  },
  [ROLES.VIEWER]: {
    canInvite: false,
    canChangeRole: false,
    canViewInvitations: false,
    canAccessTeam:false,
  },
};
