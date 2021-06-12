export const ACTION_TYPES = {
  SET_USER: 'SET_USER',
  RESET_USER: 'resetUser',
  SET_LOADING: 'SET_LOADING',
};

export const setUserData = (user) => ({
  type: ACTION_TYPES.SET_USER,
  userId: user.id,
  login: user.login,
  roles: user.roles,
});

export const setLoading = (loading) => ({
  type: ACTION_TYPES.SET_LOADING,
  isLoading: loading.isLoading,
});
