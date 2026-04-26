export const firstNameValidation = {
    required: {
      value: true,
      message: "First name is required."
    },
    minLength: {
      value: 2,
      message: "Minimum length should be 2 characters"
    },
    pattern: {
      value: /^[A-Za-z]+$/,
      message: "Only alphabets are allowed"
    }
  };
  
  export const lastNameValidation = {
    required: {
      value: true,
      message: "Last name is required."
    },
    minLength: {
      value: 2,
      message: "Minimum length should be 2 characters"
    },
    pattern: {
      value: /^[A-Za-z]+$/,
      message: "Only alphabets are allowed"
    }
  };
  
  export const emailValidation = {
    required: {
      value: true,
      message: "Email is required"
    },
    pattern: {
      value: /^[A-Za-z0-9._%+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      message: "Invalid email address"
    }
  };
  
  export const phoneNumberValidation = {
    required: {
      value: true,
      message: "Phone Number is required."
    },
    minLength: {
      value: 10,
      message: "Minimum length should be 10 characters"
    },
    maxLength: {
      value: 10,
      message: "Phone number max length should be 10 characters"
    }
  };
  
  export const passwordValidation = {
    required: {
      value: true,
      message: "Password is required."
    },
    minLength: {
      value: 8,
      message: "Minimum length should be 8 characters"
    }
  };
  
  export const addressValidation = {
    required: {
      value: true,
      message: "Address is required."
    },
    minLength: {
      value: 5,
      message: "Address must be at least 5 characters long."
    }
  };
  
  export const cityValidation = {
    required: {
      value: true,
      message: "City is required."
    }
  };
  
  export const stateValidation = {
    required: {
      value: true,
      message: "State is required."
    }
  };
  
  export const zipValidation = {
    required: {
      value: true,
      message: "Zip code is required."
    },
    pattern: {
      value: /^[1-9][0-9]{5}$/,
      message: "Enter a valid 6-digit Indian PIN code."
    }
  };
  
  export const countryValidation = {
    required: {
      value: true,
      message: "Country is required."
    }
  };