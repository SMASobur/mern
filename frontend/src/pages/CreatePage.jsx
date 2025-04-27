import { Box,useToast, Button, Container, Heading, Input, useColorModeValue, VStack } from '@chakra-ui/react'
import React, { useState, useRef } from 'react'
import { useProductStore } from '../store/product.store';



const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image:"",
    })
    const nameInputRef = useRef();
    const toast = useToast()

    const { createProduct } = useProductStore();

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);
        if(!success){
            toast({
                title: 'Opps product not created',
                description: message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });

            
        } else{
            toast({
                title: 'Product created successfully.',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
        }
        setNewProduct({name: "", price:"",image:""});
        nameInputRef.current?.focus();
    }

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"lg"} textAlign={"center"} mb={8}>Create new product
                </Heading>
                <Box w={"full"}
                bg={useColorModeValue("white", "gray.800")}
                p={5} rounded={"md"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                        placeholder='Product Name'
                        name='name'
                        autoFocus
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        ref={nameInputRef}
                        />

                        <Input
                        placeholder='Price'
                        name='price'
                        type='number'
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        />
                        <Input
                        placeholder='Image'
                        name='image'
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        />
                        <Button w='full' 
                        colorScheme='blue' 
                        onClick={handleAddProduct} 
                        >
                            Add Product
                        </Button>
                    </VStack>
                </Box>

            </VStack>
            
        </Container>
    )
}

export default CreatePage
