import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { vi, afterEach } from 'vitest';	

afterEach(() => {
	cleanup(); // Cleans up the DOM after each test 
});
