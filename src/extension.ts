import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

interface ApiRoutePattern {
    pattern: RegExp;
    resolver: (match: string, workspaceRoot: string) => string[];
}

export function activate(context: vscode.ExtensionContext) {
    const provider = vscode.languages.registerDefinitionProvider(
        ['javascript', 'typescript', 'javascriptreact', 'typescriptreact'],
        new NextApiDefinitionProvider()
    );

    context.subscriptions.push(provider);
}

class NextApiDefinitionProvider implements vscode.DefinitionProvider {
    private readonly fileExtensions = ['.ts', '.js', '.tsx', '.jsx'];
    
    // Patterns for different Next.js API route structures
    private readonly routePatterns: ApiRoutePattern[] = [
        // App Router - Route Handlers
        {
            pattern: /\/api\/([^\s'")`]+)/,
            resolver: (match: string, workspaceRoot: string) => {
                const routePath = match.replace('/api/', '');
                return this.fileExtensions.flatMap(ext => [
                    // App Router patterns
                    path.join(workspaceRoot, 'app', 'api', routePath, 'route' + ext),
                    path.join(workspaceRoot, 'app', 'api', routePath + ext),
                    path.join(workspaceRoot, 'src', 'app', 'api', routePath, 'route' + ext),
                    path.join(workspaceRoot, 'src', 'app', 'api', routePath + ext),
                    
                    // Pages Router patterns
                    path.join(workspaceRoot, 'pages', 'api', routePath + ext),
                    path.join(workspaceRoot, 'pages', 'api', routePath, 'index' + ext),
                    path.join(workspaceRoot, 'src', 'pages', 'api', routePath + ext),
                    path.join(workspaceRoot, 'src', 'pages', 'api', routePath, 'index' + ext),
                    
                    // Edge case: Custom API directory
                    path.join(workspaceRoot, 'api', routePath + ext),
                    path.join(workspaceRoot, 'src', 'api', routePath + ext),
                    
                    // Monorepo patterns
                    path.join(workspaceRoot, 'packages', 'api', routePath + ext),
                    path.join(workspaceRoot, 'apps', 'api', routePath + ext),
                    path.join(workspaceRoot, 'services', 'api', routePath + ext)
                ]);
            }
        },
        // Support for API routes with query parameters
        {
            pattern: /\/api\/([^\s'")`?]+)\?[^\s'"`)]+/,
            resolver: (match: string, workspaceRoot: string) => {
                const routePath = match.split('?')[0].replace('/api/', '');
                return this.fileExtensions.flatMap(ext => [
                    path.join(workspaceRoot, 'app', 'api', routePath, 'route' + ext),
                    path.join(workspaceRoot, 'pages', 'api', routePath + ext)
                ]);
            }
        },
        // Support for dynamic API routes
        {
            pattern: /\/api\/\[\.{3}[^\]]+\]/,
            resolver: (match: string, workspaceRoot: string) => {
                const routePath = match.replace('/api/', '');
                return this.fileExtensions.flatMap(ext => [
                    path.join(workspaceRoot, 'app', 'api', routePath, 'route' + ext),
                    path.join(workspaceRoot, 'pages', 'api', routePath + ext)
                ]);
            }
        }
    ];

    async provideDefinition(
        document: vscode.TextDocument,
        position: vscode.Position
    ): Promise<vscode.Definition | undefined> {
        // Get the text around the cursor
        const range = document.getWordRangeAtPosition(position, /\/api\/[^\s'"`)]+/);
        if (!range) {
            return undefined;
        }

        const apiRoute = document.getText(range);
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            return undefined;
        }

        // Try each workspace folder
        for (const folder of workspaceFolders) {
            // Try each route pattern
            for (const { pattern, resolver } of this.routePatterns) {
                if (pattern.test(apiRoute)) {
                    const possiblePaths = resolver(apiRoute, folder.uri.fsPath);
                    
                    // Check each possible path
                    for (const filePath of possiblePaths) {
                        if (fs.existsSync(filePath)) {
                            return new vscode.Location(
                                vscode.Uri.file(filePath),
                                new vscode.Position(0, 0)
                            );
                        }

                        // Check for catch-all routes
                        const dirPath = path.dirname(filePath);
                        if (fs.existsSync(dirPath)) {
                            const files = fs.readdirSync(dirPath);
                            const catchAllFile = files.find(file => 
                                file.startsWith('[...') && 
                                file.endsWith(path.extname(filePath))
                            );
                            
                            if (catchAllFile) {
                                return new vscode.Location(
                                    vscode.Uri.file(path.join(dirPath, catchAllFile)),
                                    new vscode.Position(0, 0)
                                );
                            }
                        }
                    }
                }
            }
        }

        return undefined;
    }
}

export function deactivate() {}
