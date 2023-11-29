import { Avatar, Box, Button, Flex, HStack, Input, Spinner, Text, useColorModeValue } from '@chakra-ui/react'
import { Green200, Green400 } from '../utils/colors'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { API_URL, AUTHOR } from '../utils/constants'

const Chatbox = () => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    useEffect(() => {
        setLoading(true)
        const getMessages = async () => {
            try {
                const { data } = await axios.get(API_URL + '/messages')
                setMessages(data.messages)
            } catch (err) {
                console.error(err.message)
            }
            setLoading(false)
        }
        getMessages()
    }, [])

    const sendMessage = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post(API_URL + '/messages', {
                message,
                author: AUTHOR,
            })

            setMessages(data.messages)
            setMessage('')
        }
        catch (err) {
            console.error(err.message)
        }

        setLoading(false)
    }




    return (
        <Box h={'calc(100vh - 70px)'} bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            {loading ?
                <Flex w="100%" overflowY="scroll" flexDirection="column" p="3" height={'calc(100vh - 130px)'} justifyContent={'center'} alignItems={'center'}>
                    <Spinner size="xl" color={Green400} />
                </Flex>
                :
                <Flex w="100%" overflowY="scroll" flexDirection="column" p="3" height={'calc(100vh - 130px)'}>
                    {messages.map((v, index) =>
                        v.author === AUTHOR ? (
                            <Flex key={index} w="100%" justify="flex-end">
                                <Flex
                                    borderRadius={'10px'}
                                    bg="black"
                                    color="white"
                                    minW="100px"
                                    maxW="350px"
                                    my="1"
                                    p="3"
                                >
                                    <Text>{v.content}</Text>
                                </Flex>
                            </Flex>
                        ) : (
                            <Flex key={index} w="100%">
                                <Avatar
                                    name="Computer"
                                    src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                                    bg="blue.300"
                                ></Avatar>
                                <Flex
                                    bg="gray.100"
                                    color="black"
                                    minW="100px"
                                    borderRadius={'10px'}
                                    maxW="350px"
                                    m="1"
                                    p="3"
                                >
                                    <Text>{v.content}</Text>
                                </Flex>
                            </Flex>
                        )
                    )}
                    <AlwaysScrollToBottom />
                </Flex>}
            <HStack w="100%" justifyContent="space-between" alignItems="center" px={4}>
                <Input value={message} onChange={
                    (e) => setMessage(e.target.value)
                } focusBorderColor={Green400} border={`1px solid ${Green200}`} outlineColor={'none'} my={'10px'} h={'40px'} placeholder="Type here..." isDisabled={loading} onKeyDown={
                    (e) => {
                        if (e.key === 'Enter') {
                            sendMessage()
                        }
                    }
                } />
                <Button isDisabled={loading} h={'40px'} backgroundColor={Green200} color={'black'} variant="solid" onClick={sendMessage}>
                    Send
                </Button>
            </HStack>
        </Box>
    )
}

export default Chatbox