import { Box, Container, Stack, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

export default function Footer() {
  return (
    <Box as="footer" bg="white" borderTop="1px solid" borderColor="gray.100" py={6} mt="auto">
      <Container maxW="7xl" display="flex" flexDir={{ base: 'column', md: 'row' }} justify="space-between" align="center" gap={4}>
        
        {/* Brand / Copyright */}
        <Stack direction="row" spacing={2} align="center">
          <Text fontWeight="bold" fontFamily="serif" fontSize="lg" color="gray.800">
            ProBlog
          </Text>
          <Text fontSize="sm" color="gray.500">
            &copy; {new Date().getFullYear()} All rights reserved.
          </Text>
        </Stack>

        {/* Links */}
        <Stack direction="row" spacing={6} fontSize="sm" color="gray.600">
          <Link as={RouterLink} to="/" _hover={{ color: 'gray.900' }}>
            Home
          </Link>
          <Link as={RouterLink} to="/dashboard" _hover={{ color: 'gray.900' }}>
            Dashboard
          </Link>
          <Link as={RouterLink} to="/write" _hover={{ color: 'gray.900' }}>
            Write
          </Link>
        </Stack>
        
      </Container>
    </Box>
  );
}