import { Flex, Spinner, Text } from '@chakra-ui/react';

export default function Loader({ text = 'Loading...' }) {
  return (
    <Flex 
      direction="column" 
      align="center" 
      justify="center" 
      minH="50vh" 
      w="full" 
      gap={3}
    >
      <Spinner 
        size="xl" 
        thickness="4px" 
        speed="0.65s" 
        color="teal.500" 
        emptyColor="gray.200" 
      />
      {text && (
        <Text fontSize="sm" color="gray.500" fontWeight="medium">
          {text}
        </Text>
      )}
    </Flex>
  );
}