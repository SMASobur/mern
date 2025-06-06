
import {  Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Link } from "react-router-dom"; // ✅ correct import
import { CgAddR } from "react-icons/cg";
import { LuSun } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineDeveloperMode } from "react-icons/md";


const Navbar = () => {
    const {colorMode, toggleColorMode}=useColorMode()
    return (
        <Container maxW ={"1140px"} px={4} p={5}  >
            <Flex 
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base:"column",
                sm:"row"
            }}

            >
                <Text
                fontSize={{ base: "22", sm: "28" }}
                fontWeight={"bold"}
                // textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient={"linear(to-r, cyan.400, cyan.500)"}
                bgClip={"text"}
                >
                    <Link to={"/"}>Product Manager </Link>
                   
                </Text>
                <HStack spaceing={2} alignItems={"center"}>

                <Link to={"/create"}>
                    <Button>
                        <CgAddR size={30}/>
                    </Button>
                </Link>
                <Link to={"/about"}>
                    <Button>
                        
                        <MdOutlineDeveloperMode  size={30}/>

                    </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    
                {colorMode === "light"? <IoMoonOutline size="28"/>:
                <LuSun size="28"/>}
                
                
                </Button>
                
                                                
                
                </HStack>

            </Flex>

        </Container>
    )
}

export default Navbar
