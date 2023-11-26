import { Box, useColorModeValue } from "@chakra-ui/react"

const Static = (props) => {
    const { children } = props

    return (
        <Box
            as="a"
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}>
            {children}
        </Box>
    )
}

export default Static