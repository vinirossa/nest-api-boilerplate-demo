export const translationKeys = {
  exceptions: {
    AUTH: {
      UNAUTHORIZED: 'exceptions.AUTH.UNAUTHORIZED',
      AUTHENTICATION_REQUIRED: 'exceptions.AUTH.AUTHENTICATION_REQUIRED',
    },
    RBAC: {
      AUTHENTICATION_REQUIRED: 'exceptions.RBAC.AUTHENTICATION_REQUIRED',
      USER_NOT_FOUND: 'exceptions.RBAC.USER_NOT_FOUND',
      INSUFFICIENT_PERMISSIONS: 'exceptions.RBAC.INSUFFICIENT_PERMISSIONS',
      INSUFFICIENT_ROLE: 'exceptions.RBAC.INSUFFICIENT_ROLE',
    },
    USERS: {
      NOT_FOUND: 'exceptions.USERS.NOT_FOUND',
    },
    PRODUCTS: {
      NOT_FOUND: 'exceptions.PRODUCTS.NOT_FOUND',
    },
  },
} as const;
