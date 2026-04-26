export const emailValidation = {
    required: {
        value: true,
        message: "Email is required",
    },
    pattern: {
        value: /^[A-Za-z0-9._%+-]+@(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.(?!-)[A-Za-z0-9-]{1,63}(?<!-))*\.[A-Za-z]{2,}$/,
        message: "Invalid email address",
    }
}

export const templateNameValidation = {
    required: {
        value: true,
        message: "Template name is required."
    },
    pattern: {
        value: /^(?!\s*$).+/,
        message: "This field cannot be empty or just spaces.",
    },
    maxLength: 255,
}

export const templateCategoryValidation = {
    required: {
        value: true,
        message: "Category must be selected."
    },
}