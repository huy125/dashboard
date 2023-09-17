import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import '@testing-library/jest-dom';

test('renders Navbar', () => {
    render(<Navbar />);

    // Verify that the component renders without errors
    const navbarElement = screen.getByText('FirePhoenix');
    expect(navbarElement).toBeInTheDocument();
});

test('clicking mobile button toggles navigation', async () => {
    render(<Navbar/>);

    // Initially, the mobile menu should be hidden
    const mobileMenu = screen.queryByTestId('mobile-menu');
    expect(mobileMenu).not.toBeInTheDocument();

    // Click the mobile button
    const mobileButton = screen.getByTestId('mobile-button') as HTMLDivElement;
    fireEvent.click(mobileButton);

    // Now, the mobile menu should be visible
    const mobileMenuVisible = screen.getByTestId('mobile-menu');
    expect(mobileMenuVisible).toBeInTheDocument();
});

test('clicking a link in mobile menu closes the menu', () => {
    render(<Navbar />);

    // Click the mobile button to open the menu
    const mobileButton = screen.getByRole('button', { name: /menu/i }) as HTMLButtonElement;
    fireEvent.click(mobileButton);

    // Click a link in the mobile menu
    const mobileLink = screen.getByText('Incomes');
    fireEvent.click(mobileLink);

    // Now, the mobile menu should be hidden again
    const mobileMenuHidden = screen.queryByText('Incomes');
    expect(mobileMenuHidden).not.toBeInTheDocument();
});

test('hovering over a link changes its color', () => {
    render(<Navbar />);

    // Find a link and hover over it
    const overviewLink = screen.getByText('Overview');
    fireEvent.mouseEnter(overviewLink);

    // Check that the link's color has changed
    expect(overviewLink).toHaveStyle('color: gray'); // Adjust the expected color

    // Move the mouse away to undo the hover
    fireEvent.mouseLeave(overviewLink);

    // Check that the link's color is back to normal
    expect(overviewLink).toHaveStyle('color: white'); // Adjust the expected color
});