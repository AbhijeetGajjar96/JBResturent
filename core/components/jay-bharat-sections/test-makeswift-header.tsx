// Test file to verify Makeswift header component works
import React from 'react';
import { MakeswitHeader } from './makeswift-header';

// Simple test component to verify the Makeswift header renders correctly
export const TestMakeswitHeader: React.FC = () => {
  return (
    <div>
      <h1>Testing Makeswift Header Component</h1>
      <MakeswitHeader
        logoText="Test Restaurant"
        backgroundColor="#f39c12"
        textColor="#2c3e50"
        cartCount={3}
        stickyHeader={true}
        showWhatsApp={true}
        whatsappNumber="1234567890"
        whatsappMessage="Hello from test!"
      />
      <div style={{ height: '200vh', padding: '20px' }}>
        <p>Scroll down to test sticky header behavior</p>
        <p>This is a long content to test scrolling...</p>
      </div>
    </div>
  );
};

export default TestMakeswitHeader;
