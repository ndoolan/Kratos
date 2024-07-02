import { Outlet, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Home, Metrics, Register, Logs, NotFound } from './pages';

const Layout = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

const App = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/logbook" element={<Logs />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
