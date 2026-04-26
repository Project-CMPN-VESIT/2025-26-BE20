export const listNameValidation = {
  required: {
    value: true,
    message: "List name is required."
  },
  minLength: {
    value: 2,
    message: "List name must be at least 2 characters."
  }
};

export const listDescriptionValidation = {
  required: {
    value: true,
    message: "Description is required."
  },
  minLength: {
    value: 5,
    message: "Description must be at least 5 characters."
  }
};