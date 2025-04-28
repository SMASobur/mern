import { 
    Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, 
    Link
  } from '@chakra-ui/react';
  import React, { useRef, useState } from 'react';
  import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
  import { useProductStore } from '../store/product.store';
  
  const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
  
    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
  
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    const cancelRef = useRef();
  
    const handleDeleteProduct = async (pid) => {
      const { success, message } = await deleteProduct(pid);
      onDeleteClose(); // close the alert dialog
      if (!success) {
        toast({
          title: 'Error',
          description: message + " something went wrong",
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Success',
          description: message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    const handleUpdateProduct = async (pid, updatedProduct) => {
      const { success, message } = await updateProduct(pid, updatedProduct);
      onEditClose();
      if (!success) {
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: "Product updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    return (
      <Box
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
      >
        <Link onClick={onModalOpen}> 
        <Image src={product.image} alt={product.name}  h={48} w='full' objectFit='cover' />
        </Link>
        
        <Box p={4}>
          <Heading as='h3' size='md' mb={2}>
            {product.name}
          </Heading>
          <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
            {product.price} :-
          </Text>
          <HStack spacing={2}>
            <IconButton icon={<EditIcon />} onClick={onEditOpen} colorScheme='blue' />
            <IconButton icon={<DeleteIcon />} onClick={onDeleteOpen} colorScheme='red' />
          </HStack>
        </Box>

        {/* Modal for view the Product */}
        <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Poduct detials</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image  src={product.image} alt={product.name} h={400} w='full' objectFit='cover' />
            <Heading textAlign="center" p={4}  as='h3' size='md' mb={2}>
              {product.name}
            </Heading>
            <Text textAlign="center" fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
              {product.price} :-
            </Text>
          </ModalBody>

          
        </ModalContent>
      </Modal>
  
        {/* Modal for Updating Product */}
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  placeholder='Product Name'
                  value={updatedProduct.name}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                />
                <Input
                  placeholder='Price'
                  type='number'
                  value={updatedProduct.price}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                />
                <Input
                  placeholder='Image'
                  value={updatedProduct.image}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                Update
              </Button>
              <Button onClick={onEditClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
  
        {/* AlertDialog for Deleting Product */}
        <AlertDialog
          isOpen={isDeleteOpen}
          leastDestructiveRef={cancelRef}
          onClose={onDeleteClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Product
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? This action cannot be undo.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                
                <Button colorScheme='red' mr={3} onClick={() => handleDeleteProduct(product._id)} ml={3}>
                  Delete
                </Button>
                <Button ref={cancelRef} onClick={onDeleteClose}>
                  Cancel
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
  
      </Box>
    );
  };
  
  export default ProductCard;
  