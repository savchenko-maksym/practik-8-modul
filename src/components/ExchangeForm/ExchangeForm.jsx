import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { useDispatch } from 'react-redux';
import { getExchangeInfo } from '../../redux/currency/operations';

const pattern = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/;

const ExchangeForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = event => {
    event.preventDefault();
    const value = event.target.request.value;
    const isValid = pattern.test(value);
    if (!isValid) {
      return;
    }
    console.log(value);
    const [amount, from, , to] = value.split(' ');
    const request = { amount, from, to };
    dispatch(getExchangeInfo(request));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        name="request"
        title="Request format 15 USD in UAH"
        className={styles.input}
      />
    </form>
  );
};

export default ExchangeForm;
