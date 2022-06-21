// ts-ignore:  no-useless-escape
let expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const ValidateEmail = (email: string): boolean => {
  return expression.test(String(email).toLowerCase());
};

