import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Rates from './pages/Rates';
import Header from './components/Header/Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBaseCurrency } from './redux/currency/operations';
import { setDefaultCurrency } from './redux/currency/slice';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;

      dispatch(getBaseCurrency(crd));
    }

    function error(err) {
      dispatch(setDefaultCurrency('USD'));
    }

    window.navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
