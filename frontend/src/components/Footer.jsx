import React from 'react'
import { Box, Flex, Text, Link, Stack } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box bg="gray.600" color="gray.200" py={6} mt={1}>
            <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            maxW="6xl"
            mx="auto"
            px={4}
            >
            <Text fontSize="sm">© {new Date().getFullYear()} KnitKnox. All rights reserved.</Text>
    
            <Stack direction="row" spacing={4} mt={{ base: 4, md: 0 }}>
                <Link href="#" _hover={{ textDecoration: "underline" }}>
                Privacy Policy
                </Link>
                <Link href="#" _hover={{ textDecoration: "underline" }}>
                Terms of Service
                </Link>
                <Link href="#" _hover={{ textDecoration: "underline" }}>
                Contact
                </Link>
            </Stack>
            </Flex>
        </Box>
    )
}

export default Footer
