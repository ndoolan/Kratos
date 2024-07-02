import './NavBar.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from '../Login';
import {
  Flex,
  Stack,
  Box,
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const handleLogout = async () => {
  try {
    axios.post('auth/logout').then((data) => console.log(data));
  } catch (error) {
    console.log(`Error logging out. Error: ${error}`);
  }
};

const NavBar = (): JSX.Element => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.100', 'blackAlpha.700'); // plug in new Light Mode Color?

  return (
    <Box bg={bgColor} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Stack direction={'row'} spacing={8}>
          <Button bg="transparent" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button bg="transparent" onClick={() => navigate('/logbook')}>
            Logs
          </Button>
          <Button bg="transparent" onClick={() => navigate('/metrics')}>
            Metrics
          </Button>
          <Button bg="transparent" onClick={() => navigate('/register')}>
            Register
          </Button>
        </Stack>

        <Flex>
          <Stack direction={'row'} spacing={5}>
            <Button bg="transparent" onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Login />
            <Button bg="transparent" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
