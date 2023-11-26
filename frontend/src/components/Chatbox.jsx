import { Avatar, Box, Button, Flex, HStack, Input, Text, useColorModeValue } from '@chakra-ui/react'
import { Green200, Green400 } from '../utils/colors'
import React, { useEffect, useRef } from 'react'

const Chatbox = () => {
    const numbers = [...Array(100).keys()]

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    return (
        <Box h={'calc(100vh - 70px)'} bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex w="100%" overflowY="scroll" flexDirection="column" p="3" height={'calc(100vh - 130px)'}>
                {numbers.map((v) =>
                    v % 2 === 0 ? (
                        <Flex key={v} w="100%" justify="flex-end">
                            <Flex
                                borderRadius={'10px'}
                                bg="black"
                                color="white"
                                minW="100px"
                                maxW="350px"
                                my="1"
                                p="3"
                            >
                                <Text>{v}</Text>
                            </Flex>
                        </Flex>
                    ) : (
                        <Flex key={v} w="100%">
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
                                <Text>{v}</Text>
                            </Flex>
                        </Flex>
                    )
                )}
                <AlwaysScrollToBottom />
            </Flex>
            <HStack w="100%" justifyContent="space-between" alignItems="center" px={4}>
                <Input focusBorderColor={Green400} border={`1px solid ${Green200}`} outlineColor={'none'} my={'10px'} h={'40px'} placeholder="Type here..." />
                <Button h={'40px'} backgroundColor={Green200} color={'black'} variant="solid">
                    Send
                </Button>
            </HStack>
        </Box>
    )
}

export default Chatbox