# NextHop

A VS Code extension that enables Ctrl+Click (Cmd+Click on Mac) navigation for Next.js API routes in your code. Works with both App Router and Pages Router!

## Features

### Next.js Support

- **App Router Support** - Navigate to route handlers in `/app/api` directory
- **Pages Router Support** - Works with traditional `/pages/api` structure
- **Dynamic Routes** - Supports all Next.js route patterns:
  - Basic dynamic routes (`[id].ts`)
  - Catch-all routes (`[...slug].ts`)
  - Optional catch-all routes (`[[...slug]].ts`)
  - Query parameters (`/api/users?id=1`)

### Project Structure Support

- Standard Next.js structure
- Source directory (`src/`) structure
- Monorepo patterns:
  - `packages/api/`
  - `apps/api/`
  - `services/api/`
- Custom API directories

### File Support

- TypeScript (.ts)
- JavaScript (.js)
- TypeScript React (.tsx)
- JavaScript React (.jsx)

## Usage

1. Install the extension
2. Open a Next.js project in VS Code
3. In your code, when you see a Next.js API route string (e.g., `/api/users`), hold Ctrl (Cmd on Mac) and click on it
4. The extension will navigate you to the corresponding API route file

### Examples

```typescript
// All these routes work with Ctrl+Click:

// App Router
fetch('/api/users')               // -> app/api/users/route.ts
fetch('/api/posts/[id]')         // -> app/api/posts/[id]/route.ts
fetch('/api/auth/[...auth]')     // -> app/api/auth/[...auth]/route.ts

// Pages Router
fetch('/api/users')              // -> pages/api/users.ts
fetch('/api/posts/[id]')         // -> pages/api/posts/[id].ts
fetch('/api/auth/[...auth]')     // -> pages/api/auth/[...auth].ts

// Works with query parameters
fetch('/api/users?id=1')         // -> app/api/users/route.ts or pages/api/users.ts

// Source directory structure
fetch('/api/users')              // -> src/app/api/users/route.ts or src/pages/api/users.ts
```

## Requirements

- VS Code version 1.60.0 or higher
- A Next.js project

## Installation

1. Download the .vsix file
2. In VS Code, press Ctrl+Shift+P (Cmd+Shift+P on Mac)
3. Type "Install from VSIX" and select the file
4. Reload VS Code when prompted

## Development Process

This project was developed through an innovative collaboration between human direction and AI assistance. The implementation was primarily done using Windsurf's Cascade AI assistant, with human oversight and guidance throughout the process.

We believe in transparency about our development process and embrace the potential of human-AI collaboration while maintaining high standards for code quality and user experience.

### Our Approach

- **Human Direction**: Project concept, quality assurance, and strategic decisions
- **AI Implementation**: Code development, testing, and documentation
- **Quality Standards**: Rigorous testing and code review process
- **Community Focus**: Open to contributions and feedback

We're proud to demonstrate the potential of responsible human-AI collaboration in creating developer tools. This transparent approach helps push the boundaries of what's possible while maintaining high standards for code quality.

## Contributing

We welcome contributions from the community! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. We embrace both traditional and AI-assisted contributions, with a focus on code quality and user value.

## License

MIT

## Acknowledgments

Special thanks to:

- The Next.js community for inspiration
- Windsurf's Cascade AI for development assistance
- All contributors and users of this extension
