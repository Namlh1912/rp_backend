module.exports = {
  tableName: "customers",
  attributes: {
    id: {
      type: "integer",
      primaryKey: true
    },
    name: {
      type: "string"
    },
    email: {
      type: "string"
    },
    phone: {
      type: "string"
    },
    city: {
      type: "string"
    },
    company: {
      type: "string"
    },
    business: {
      type: "string"
    },
    status: {
      type: "boolean",
      defaultsTo: true
    },
    noter: {
      type: "string"
    },
    interviewer: {
      type: "string"
    }
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
};
