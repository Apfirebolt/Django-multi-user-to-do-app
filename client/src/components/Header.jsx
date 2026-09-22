import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { userAtom, isAuthenticatedAtom, logoutAtom } from '../store/authAtoms';
import { Box, Flex, Heading, Button, Text, HStack } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router';

export default function Header() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const user = useAtomValue(userAtom);
  const logout = useSetAtom(logoutAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box as="header" bg="white" px={6} py={4} borderBottom="1px solid" borderColor="gray.100" shadow="sm">
      <Flex maxW="7xl" mx="auto" justifyContent="space-between" alignItems="center">
        
        {/* Brand / Logo */}
        <Heading as={RouterLink} to="/" size="md" fontFamily="serif" _hover={{ textDecoration: 'none' }}>
          ProBlog
        </Heading>

        {/* Navigation Actions */}
        <HStack spacing={4}>
          {isAuthenticated ? (
            <>
              <Text fontSize="sm" color="gray.600" display={{ base: 'none', md: 'block' }}>
                {user?.email || 'Logged In'}
              </Text>
              
              <Button as={RouterLink} to="/dashboard" size="sm" variant="ghost">
                Dashboard
              </Button>
              
              <Button as={RouterLink} to="/write" size="sm" colorScheme="teal">
                Write
              </Button>
              
              <Button onClick={handleLogout} size="sm" colorScheme="red" variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={RouterLink} to="/login" size="sm" variant="ghost">
                Sign In
              </Button>
              
              <Button as={RouterLink} to="/register" size="sm" colorScheme="blackAlpha">
                Get Started
              </Button>
            </>
          )}
        </HStack>

      </Flex>
    </Box>
  );
}