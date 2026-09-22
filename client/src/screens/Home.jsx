import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { isAuthenticatedAtom, userAtom } from '../store/authAtoms';
import { Container, Heading, Text, Button, VStack, HStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import httpClient from '../plugins/interceptor';

export default function Home() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const user = useAtomValue(userAtom);

  // if user is logged in get all users
  useEffect(() => {
    if (isAuthenticated) {
      httpClient.get('/users')
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [isAuthenticated]);

  return (
    <Container maxW="4xl" py={20}>
      <VStack spacing={6} textAlign="center" align="center">
        
        <Heading as="h1" size="2xl" fontWeight="serif" lineHeight="shorter">
          {isAuthenticated ? `Welcome back, ${user?.email}!` : 'Where good ideas find you.'}
        </Heading>
        
        <Text fontSize="lg" color="gray.600" maxW="lg">
          A simple boilerplate platform for sharing stories, thoughts, and expertise with the world. Built with React, Chakra UI, and Django.
        </Text>

        <HStack spacing={4} pt={4}>
          {isAuthenticated ? (
            <>
              <Button as={RouterLink} to="/dashboard" variant="outline" size="lg">
                Go to Dashboard
              </Button>
            </>
          ) : (
            <>
              <Button as={RouterLink} to="/register" colorScheme="blackAlpha" size="lg">
                Get Started
              </Button>
              <Button as={RouterLink} to="/login" variant="outline" size="lg">
                Sign In
              </Button>
            </>
          )}
        </HStack>

      </VStack>
    </Container>
  );
}