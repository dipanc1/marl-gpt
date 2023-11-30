import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Image,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import logo from '../images/logo.png'
import marl from '../images/marl.jpg'
import dipan from '../images/dipan.jpg'
import { Green50, Green900 } from '../utils/colors'
import axios from 'axios'
import { API_URL } from '../utils/constants'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Nav = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { dispatch } = useContext(AppContext)


    const handleClear = async () => {
        try {
            await axios.delete(API_URL + '/messages')
            dispatch({ type: 'SET_MESSAGES', payload: [] })
        } catch (err) {
            console.error(err.message)
        }
    }


    return (
        <>
            <Box bg={useColorModeValue(Green50, Green900)} px={4}>
                <Flex h={'70px'} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Image src={logo} alt={'logo'} width={'200px'}
                            style={{
                                filter: colorMode === 'light' ? 'invert(0)' : 'invert(1)',

                            }} />
                    </Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>
                            <Button onClick={handleClear}>
                                Clear Chat
                            </Button>

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={marl}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={dipan}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>Hello, Girl!</p>
                                    </Center>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default Nav