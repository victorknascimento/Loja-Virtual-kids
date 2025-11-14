import React from 'react';

// New logo inspired by the provided image, using the new pink color scheme.
const logoSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjEwIDUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yMC4zIDEyQzE4LjYgMTAuMyAxNi4zIDEwIDE0IDEwLjVDMTEuNyAxMSAxMCAxMi4zIDkuNyAxNC43QzEwLjcgMTEuMyAxMy4zIDguNyAxNi43IDguN0MyMC43IDguNyAyNCAxMiAyNCAxNi41QzI0IDIxIDIwLjcgMjUgMTYuNSAyNUMxMi4zIDI1IDkgMjIgOSA MTYuNUM5IDEwLjUgMTIuNSA3IDE3IDdDMjIgNyAyNSA5LjUgMjUgMTQuNUMyNSAxOS41IDIxIDI0IDE2IDI0QzEwIDI0IDcgMjAgNyAxNC41QzcgMTAgMTAuNSA2IDE1IDE2WiIgZmlsbD0iI0RDNEY4OCIvPjxwYXRoIGQ9Ik0zMy4zIDEyQzMxLjYgMTAuMyAyOS4zIDEwIDI3IDEwLjVDMjQuNyAxMSAyMyAxMi4zIDIyLjcgMTQuN0MyMy43IDExLjMgMjYuMyA4LjcgMjkuNyA4LjdDNDEgOC43IDQxIDE3IDMxIDE3WiIgZmlsbD0iI0Y0NzJCRSIvPjx0ZXh0IHg9IjUwIiB5PSIzOCIgc3R5bGU9ImZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDMycHk7IGZvbnQtd2VpZ2h0OiBib2xkOyBmaWxsOiAiI0Q5NUE4MDsiPkp1anU8dHNwYW4gZmlsbD0iI0VDNzVBMCIgZHg9IjUiPktpZHM8L3RzcGFuPjwvdGV4dD48L3N2Zz4=';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <img src={logoSrc} alt="Juju Kids Logo" className="h-12 md:h-14 w-auto" />
    </div>
  );
};

export default Logo;