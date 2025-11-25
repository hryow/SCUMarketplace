import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import CreateListingPage from '../CreateListingPage';

// Mock Header component to simplify the testing 
vi.mock('../Header', () => ({
  default: ({ userEmail }) => <div>Header: {userEmail}</div>
}));

