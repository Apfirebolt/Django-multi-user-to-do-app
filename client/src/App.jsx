import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Box, Flex } from '@chakra-ui/react';

// Import Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Import Screens
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';

export default function App() {
  return (
    <Router>
      <Flex direction="column" minH="100vh">
        {/* Global Navigation Header */}
        <Header />

        {/* Main Content Area */}
        <Box flex="1" as="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* You can add Dashboard or Write routes here later */}
          </Routes>
        </Box>

        {/* Global Footer */}
        <Footer />
      </Flex>
    </Router>
  );
}