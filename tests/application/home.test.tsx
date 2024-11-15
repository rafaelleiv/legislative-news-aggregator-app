/**
 * @jest-environment jsdom
 */

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '/',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

// describe('Home', () => {
//   it('renders a heading', () => {
//     render(<Home />);
//
//     const heading = screen.getByRole('h1', {
//       name: /Fallow the legislative news road/i,
//     });
//
//     expect(heading).toBeInTheDocument();
//   });
// });
