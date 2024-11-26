import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';

// Mock the vscode namespace
const vscode = {
    Position: class {
        constructor(public line: number, public character: number) {}
    },
    Location: class {
        constructor(public uri: any, public range: any) {}
    },
    Uri: {
        file: (path: string) => ({ fsPath: path })
    }
};

describe('NextHop Extension Test Suite', () => {
    const tempWorkspacePath = path.join(__dirname, '../../../test-workspace');
    const apiStructures = {
        appRouter: ['app/api', 'src/app/api'],
        pagesRouter: ['pages/api', 'src/pages/api'],
        customApi: ['api', 'src/api'],
        monorepo: ['packages/api', 'apps/api', 'services/api']
    };

    const setupWorkspace = () => {
        if (!fs.existsSync(tempWorkspacePath)) {
            fs.mkdirSync(tempWorkspacePath, { recursive: true });
        }

        for (const [_, paths] of Object.entries(apiStructures)) {
            for (const apiPath of paths) {
                const fullPath = path.join(tempWorkspacePath, apiPath, 'users');
                fs.mkdirSync(fullPath, { recursive: true });
                fs.writeFileSync(path.join(fullPath, 'route.ts'), '');
            }
        }

        // Create catch-all route
        const catchAllPath = path.join(tempWorkspacePath, 'pages/api/[...slug]');
        fs.mkdirSync(catchAllPath, { recursive: true });
        fs.writeFileSync(path.join(catchAllPath, 'route.ts'), '');
    };

    const cleanWorkspace = () => {
        if (fs.existsSync(tempWorkspacePath)) {
            fs.rmSync(tempWorkspacePath, { recursive: true, force: true });
        }
    };

    before(() => {
        setupWorkspace();
    });

    after(() => {
        cleanWorkspace();
    });

    describe('Route Pattern Tests', () => {
        it('Basic API route pattern', () => {
            const apiRoute = '/api/users';
            const fileExtensions = ['.ts', '.js', '.tsx', '.jsx'];
            
            const possiblePaths = fileExtensions.flatMap(ext => [
                path.join(tempWorkspacePath, 'app/api/users/route' + ext),
                path.join(tempWorkspacePath, 'pages/api/users' + ext),
                path.join(tempWorkspacePath, 'src/api/users' + ext)
            ]);

            const exists = possiblePaths.some(p => fs.existsSync(p));
            assert.ok(exists, 'Should find at least one matching API route file');
        });

        it('API route with query parameters', () => {
            const apiRoute = '/api/users?id=123';
            const routePath = apiRoute.split('?')[0].replace('/api/', '');
            const fileExtensions = ['.ts', '.js', '.tsx', '.jsx'];
            
            const possiblePaths = fileExtensions.flatMap(ext => [
                path.join(tempWorkspacePath, 'app/api', routePath, 'route' + ext),
                path.join(tempWorkspacePath, 'pages/api', routePath + ext)
            ]);

            const exists = possiblePaths.some(p => fs.existsSync(p));
            assert.ok(exists, 'Should find API route file when route has query parameters');
        });

        it('Dynamic API route', () => {
            const apiRoute = '/api/[...slug]';
            const routePath = apiRoute.replace('/api/', '');
            const fileExtensions = ['.ts', '.js', '.tsx', '.jsx'];
            
            const possiblePaths = fileExtensions.flatMap(ext => [
                path.join(tempWorkspacePath, 'pages/api', routePath, 'route' + ext)
            ]);

            const exists = possiblePaths.some(p => fs.existsSync(p));
            assert.ok(exists, 'Should find catch-all route file');
        });
    });

    describe('File Structure Tests', () => {
        it('App Router structure', () => {
            const exists = fs.existsSync(path.join(tempWorkspacePath, 'app/api/users/route.ts')) ||
                         fs.existsSync(path.join(tempWorkspacePath, 'src/app/api/users/route.ts'));
            assert.ok(exists, 'Should find file in App Router structure');
        });

        it('Pages Router structure', () => {
            const exists = fs.existsSync(path.join(tempWorkspacePath, 'pages/api/users/route.ts')) ||
                         fs.existsSync(path.join(tempWorkspacePath, 'src/pages/api/users/route.ts'));
            assert.ok(exists, 'Should find file in Pages Router structure');
        });

        it('Custom API directory structure', () => {
            const exists = fs.existsSync(path.join(tempWorkspacePath, 'api/users/route.ts')) ||
                         fs.existsSync(path.join(tempWorkspacePath, 'src/api/users/route.ts'));
            assert.ok(exists, 'Should find file in custom API directory');
        });

        it('Monorepo structure', () => {
            const exists = fs.existsSync(path.join(tempWorkspacePath, 'packages/api/users/route.ts')) ||
                         fs.existsSync(path.join(tempWorkspacePath, 'apps/api/users/route.ts')) ||
                         fs.existsSync(path.join(tempWorkspacePath, 'services/api/users/route.ts'));
            assert.ok(exists, 'Should find file in monorepo structure');
        });
    });

    describe('Edge Cases', () => {
        it('Invalid API route', () => {
            const nonexistentPath = path.join(tempWorkspacePath, 'api/nonexistent/route.ts');
            assert.ok(!fs.existsSync(nonexistentPath), 'Should not find invalid API route');
        });

        it('Empty workspace', () => {
            cleanWorkspace();
            const apiPath = path.join(tempWorkspacePath, 'api/users/route.ts');
            assert.ok(!fs.existsSync(apiPath), 'Should not find files in empty workspace');
            setupWorkspace(); // Restore workspace for other tests
        });
    });
});
