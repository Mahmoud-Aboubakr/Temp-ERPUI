export const config = {
  apiUrl: 'https://localhost:44304/api/',
  fileUrl:'https://localhost:7258/',
  paginationList: [5, 10, 20],
  status:['pending', 'active'],
  authRoles: {
    sa: ['SA'], // Only Super Admin has access
    admin: ['SA', 'Admin'], // Only SA & Admin has access
    editor: ['SA', 'Admin', 'Editor'], // Only SA & Admin & Editor has access
    user: ['SA', 'Admin', 'Editor', 'User'], // Only SA & Admin & Editor & User has access
    guest: ['SA', 'Admin', 'Editor', 'User', 'Guest'] // Everyone has access
  }
}