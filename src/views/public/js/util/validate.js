// value
export const check = {
  name: false,
  email: false,
  phNum: true,
  pw: true,
  address: true,
};

export const emailValidate = (email) => {
  const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return reg.test(email);
};

export const phNumValidate = (phNum) => {
  const reg = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return reg.test(phNum);
};

export const passwordValidate = (password) => {
  const reg =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=\-_`~\[\]\{\}\\\|<>\/?\.\,;:'"])[a-zA-Z0-9!@#$%^&*+=\-_`~\[\]\{\}\\\|<>\/?\.\,;:'"]{8,15}$/;
  // const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/;
  return reg.test(password);
};
