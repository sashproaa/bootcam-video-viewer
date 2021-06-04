import * as yup from 'yup';

export const password = yup
  .string()
  .required('Обязательное поле')
  .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру.')
  .matches(/[A-ZА-ЯЁ]/, 'Пароль должен содержать хотя бы одну заглавную букву.')
  .matches(/[a-zа-яё]/, 'Пароль должен содержать хотя бы одну строчную букву.')
  .min(8, 'Пароль должен состоять не менее чем из 8 символов.');

export const email = yup
  .string()
  .email('Email не валидный')
  .required('Обязательное поле');

export const schemaRegistration = yup.object().shape({
  email: email,
  password: password,
});

const getDate = (years: number) => {
  const current = new Date();
  const date = current.setFullYear(current.getFullYear() - years);
  return new Date(date).toISOString();
};

export const schemaProfile = yup.object().shape({
  first_name: yup
    .string()
    .min(2, 'Имя должно состоять минимум из 2 букв')
    .matches(/^\w+$/, 'Недопустимые символы'),
  last_name: yup.string().min(2, 'Фамилия должна состоять минимум из 2 букв'),
  mobile: yup
    .string()
    .matches(/\+38\d{10}/, 'Телефон должен быть в формате +38xxxyyyyyyy')
    .matches(/^\w+$/, 'Недопустимые символы'),
  date_of_birth: yup
    .date()
    .max(getDate(14), 'У родителей деньги тыришь?')
    .max(new Date().toISOString(), 'Вернись в реальность.')
    .min(getDate(100), 'Столько не живут'),
  gender: yup.string(),
});

export const schemaChangePassword = yup.object().shape({
  new_password1: password,
  new_password2: password.oneOf(
    [yup.ref('new_password1'), null],
    'Пароли должны совпадать',
  ),
});
