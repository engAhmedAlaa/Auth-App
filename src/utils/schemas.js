import * as Yup from 'yup';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*/(/)]).{5,}$/;

export const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .matches(emailRegex, { message: 'Enter a valid email' })
    .required('Required'),
  password: Yup.string()
    .matches(passwordRegex, {
      message:
        'Must contain at least one lower case character and one upper case character and one digit and one special character and to be 5 or more',
    })
    .required('Required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Required'),
});

export const logInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .matches(emailRegex, { message: 'Enter a valid email' })
    .required('Required'),
  password: Yup.string()
    .matches(passwordRegex, {
      message:
        'Must contain at least one lower case character and one upper case character and one digit and one special character and to be 5 or more',
    })
    .required('Required'),
});

export const updateEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .matches(emailRegex, { message: 'Enter a valid email' })
    .required('Required'),
  password: Yup.string()
    .matches(passwordRegex, {
      message:
        'Must contain at least one lower case character and one upper case character and one digit and one special character and to be 5 or more',
    })
    .required('Required'),
});

export const updatePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .matches(passwordRegex, {
      message:
        'Must contain at least one lower case character and one upper case character and one digit and one special character and to be 5 or more',
    })
    .required('Required'),
  newPassword: Yup.string()
    .matches(passwordRegex, {
      message:
        'Must contain at least one lower case character and one upper case character and one digit and one special character and to be 5 or more',
    })
    .required('Required'),
  newPasswordConfirm: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match')
    .required('Required'),
});

export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .matches(emailRegex, { message: 'Enter a valid email' })
    .required('Required'),
});

export const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .matches(passwordRegex, {
      message:
        'Must contain at least one lower case character and one upper case character and one digit and one special character and to be 5 or more',
    })
    .required('Required'),
  newPasswordConfirm: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match')
    .required('Required'),
});

export const deleteUserSchema = Yup.object().shape({
  password: Yup.string()
    .matches(passwordRegex, {
      message:
        'Must contain at least one lower case character and one upper case character and one digit and one special character and to be 5 or more',
    })
    .required('Required'),
});
