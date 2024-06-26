import { Flex, Switch, FormLabel } from '@chakra-ui/react';
import QuickLogForm from '../components/QuickLogForm';
import LogDisplay from '../components/LogDisplay';
import LogForm from '../components/LogForm';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import NoUser from '../components/NoUser';

const Logs = (): JSX.Element => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    console.log(toggle);
    setToggle(!toggle);
  };

  if (!currentUser) {
    return <NoUser />;
  }

  return (
    <Flex direction="row" justifyContent="center" gap={400} p={10}>
      <Flex direction="column">
        <FormLabel>Form Toggle</FormLabel>
        <Switch onChange={handleToggle} />
        {toggle ? <QuickLogForm /> : <LogForm />}
      </Flex>
      <LogDisplay />
    </Flex>
  );
};

export default Logs;
