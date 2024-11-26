# Contributing to NextHop

First off, thank you for considering contributing to NextHop! It's people like you that make this extension better for everyone.

## Development Philosophy

This project embraces modern development practices, including AI-assisted development. We believe in:
- Transparency about our development process
- High standards for code quality
- Inclusive and welcoming community
- Both traditional and AI-assisted contributions

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Maintain professional discourse

## How Can I Contribute?

### Reporting Bugs
1. Check if the bug is already reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - VS Code and Next.js versions
   - Project structure (if relevant)

### Suggesting Enhancements
1. Check existing issues and discussions
2. Create a new issue with:
   - Clear use case
   - Expected benefits
   - Potential implementation approach
   - Impact on existing functionality

### Pull Requests

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Add or update tests
5. Update documentation
6. Submit a pull request

#### Pull Request Guidelines
- Follow existing code style
- Include tests for new functionality
- Update relevant documentation
- One feature/fix per PR
- Keep changes focused and atomic

## Development Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Build the extension:
```bash
npm run compile
```
4. Run tests:
```bash
npm test
```

## AI Usage Guidelines

We welcome AI-assisted contributions but maintain some guidelines:

### Acceptable AI Usage
- Code implementation assistance
- Documentation generation
- Test case generation
- Code optimization suggestions
- Bug fix suggestions

### AI Usage Requirements
1. **Transparency**: Mention AI assistance in PR description
2. **Quality**: All code must pass tests and review
3. **Understanding**: You should understand the changes
4. **Responsibility**: You're responsible for the code quality

### Best Practices
- Review AI-generated code thoroughly
- Test extensively
- Ensure maintainable code
- Keep changes focused
- Document AI-specific considerations

## Testing

### Running Tests
```bash
npm test
```

### Writing Tests
- Place tests in `src/test/suite`
- Follow existing test patterns
- Cover edge cases
- Include both positive and negative tests

## Documentation

- Update README.md for user-facing changes
- Update inline documentation
- Add JSDoc comments for new functions
- Update CHANGELOG.md

## Review Process

1. Automated checks must pass
2. Code review by maintainers
3. Documentation review
4. Testing verification
5. Final approval

## Project Structure

```
next-api-click/
├── src/
│   ├── extension.ts       # Main extension code
│   ├── test/             # Test files
│   └── utils/            # Utility functions
├── .docs/                # Documentation
├── CONTRIBUTING.md       # This file
├── README.md            # Project overview
└── package.json         # Project configuration
```

## Release Process

1. Version bump in package.json
2. Update CHANGELOG.md
3. Create release notes
4. Build and test
5. Create GitHub release
6. Publish to VS Code Marketplace

## Questions?

Feel free to:
1. Open an issue for clarification
2. Start a discussion
3. Reach out to maintainers

## Attribution

Remember to:
- Credit original authors
- Mention AI assistance when used
- Respect licenses and copyrights
- Document external sources

Thank you for contributing to NextHop!
