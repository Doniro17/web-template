const { user } = require('@model');

const getUser = async (id) => {
  return await user.findOne({
    where: {
      id: id,
    },
  });
};

module.exports = async (id, role) => {
  const body = await getUser(id);
  return body.role.includes(role);
};
