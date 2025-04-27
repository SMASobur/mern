
import { Routes, Route, Link } from "react-router-dom";
import { Box, Button, Container, Divider, Flex,useColorModeValue } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  return (
    <>
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.700")}>
      <Navbar  />
      {/* <Container  maxW='container.xl' py={10}>
        <Flex h={16} gap={4} 
        flexDir={{
          base:"column",
          sm:"row"
        }} >
          <Button as={Link} to="/" colorScheme="teal" >Home</Button>
          <Button as={Link} to="/create" colorScheme="orange">Create</Button>
          <Button as={Link} to="/about" colorScheme="blue">About</Button>
        </Flex>
      </Container> */}
      <Divider />
      
      
      <Routes p={8}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/create" element={<CreatePage/>} />
      </Routes>
      
    </Box>

    <Footer />

    
    </>
  );
}

export default App;
