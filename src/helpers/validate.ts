import { REGEX_PATTERN_EMAIL_ADDRESS, REGEX_PATTERN_PHONE_NUMBER } from 'src/helpers/constants';

const required = (val: unknown) => (val && String(val).length > 0) || 'Field is required!';

const email = (email: string) =>
  email ? REGEX_PATTERN_EMAIL_ADDRESS.test(email.toLowerCase()) || 'Invalid email!' : true;

const phone = (phone: string) => {
  const numbers = phone.split(/[()-\s]/).join('');
  return numbers ? REGEX_PATTERN_PHONE_NUMBER.test(numbers) || 'Invalid phone!' : true;
};

const digitOnly = (val: string) => val.match(/^[0-9]+$/) || 'Input contains only digits from 0 to 9';

export default { required, email, phone, digitOnly };
