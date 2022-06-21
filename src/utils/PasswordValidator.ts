// const expression = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
const expression = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])(?=.*?[#?!@$%^&*-]).{8,}$"
);

export const ValidatePassword = (password: string): boolean => {
    return expression.test(password);
};

