# MCP (Model Context Protocol) Servers Configuration

This directory contains configuration files for MCP servers integrated with Claude Code.

## Available MCP Servers

This project has two MCP servers configured:

1. **GitHub MCP** - Interact with GitHub repositories, PRs, issues, and code
2. **Angular MCP** - Access Angular documentation and best practices

---

## Angular MCP Server

The Angular MCP server (`angular.json`) provides direct access to Angular documentation and framework guidance.

### Capabilities

- **Documentation Access**: Browse Angular official documentation
- **API Reference**: Search Angular API documentation
- **Best Practices**: Get Angular development best practices and patterns
- **Framework Guidance**: Understanding Angular concepts and architecture
- **Version Information**: Access documentation for different Angular versions
- **Code Examples**: Get Angular code examples and patterns

### Setup Instructions

No additional setup required! The Angular MCP server works out of the box once Claude Code loads it.

### Usage Examples

With the Angular MCP active, you can ask Claude Code things like:

```
"What's the best way to implement reactive forms in Angular?"
"Show me the Angular API documentation for HttpClient"
"How do I implement dependency injection in Angular services?"
"What are Angular best practices for component architecture?"
"Help me understand Angular change detection strategies"
```

### Key Features

- **Real-time Documentation**: Always get current Angular docs
- **Framework Integration**: Understand Angular-specific concepts
- **Best Practices**: Learn Angular development patterns
- **Performance Tips**: Get Angular optimization guidance
- **Security**: Learn Angular security best practices

---

## GitHub MCP Server

The GitHub MCP server (`github.json`) enables Claude Code to interact with GitHub directly, providing access to:

### Capabilities

- **Repository Management**: Read repository information, branches, commits, and pull requests
- **Issue Management**: View, create, and manage issues
- **Pull Request Operations**: List, view, create, and manage pull requests
- **Code Search**: Search for code across repositories
- **User Information**: Access user profile and organization data
- **Gists Management**: Create and manage GitHub Gists

### Setup Instructions

#### 1. **Set Your GitHub Token**

The configuration uses the `GITHUB_TOKEN` environment variable. You have two options:

**Option A: System Environment Variable (Persistent)**
```bash
# Windows PowerShell (Run as Administrator)
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "your_token_here", "User")

# Then restart your terminal/IDE for changes to take effect
```

**Option B: Local Environment File (Project-Specific)**
Create a `.env.local` file in the project root:
```bash
GITHUB_TOKEN=your_token_here
```

#### 2. **Generate Your GitHub Token**

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Configure scopes:
   - `repo` - Full control of private repositories
   - `read:user` - Read user profile data
   - `read:org` - Read organization data (if needed)
4. Copy the token and store it securely

#### 3. **Verify Installation**

Once the token is configured, Claude Code will automatically load the GitHub MCP server when you:
- Ask about GitHub repositories
- Request PR or issue operations
- Need to search GitHub code
- Want to interact with your repository

### Usage Examples

With the GitHub MCP server active, you can:

```
"Create a pull request to add TypeScript strict mode"
"List all open issues in this repository"
"Search for TODO comments in my codebase"
"Get the last 10 commits with their messages"
"Create a GitHub Gist with my CLAUDE.md file"
```

### Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit your token** to the repository
   - `.env` and `.env.local` are in `.gitignore`
   - `GITHUB_TOKEN` should only be in system environment variables

2. **Token Scope**: Use the minimal required scopes
   - Classic tokens with just `repo` and `read:user` are sufficient for most workflows
   - Fine-grained tokens provide more granular control

3. **Token Rotation**: Periodically rotate your token for security
   - Generate a new token regularly
   - Revoke old tokens from GitHub settings

4. **Repository Privacy**: Ensure your repository visibility aligns with your token scope

### Troubleshooting

**"GitHub MCP not available" or "Token not found"**
- Verify `GITHUB_TOKEN` is set in your environment
- Restart Claude Code after setting environment variables
- Check token hasn't expired

**"Permission denied" errors**
- Verify token has required scopes
- Check you're accessing repositories the token has access to
- For organization repositories, ensure `read:org` scope is enabled

**Network/Connection issues**
- Verify you have internet connectivity
- Check if GitHub is experiencing outages
- Ensure no proxy/firewall blocks GitHub API

### Configuration File Reference

The `github.json` file uses the MCP server configuration format:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@github/github-mcp-server"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

- **command**: How to invoke the server (using npx)
- **args**: Arguments passed to the server
- **env**: Environment variables passed to the server
- `${GITHUB_TOKEN}`: Substituted with your system environment variable

### Related Resources

- [GitHub MCP Server Documentation](https://github.com/github/github-mcp-server)
- [GitHub Personal Access Tokens](https://github.com/settings/tokens)
- [MCP Protocol Documentation](https://modelcontextprotocol.io/)
- [Claude Code Documentation](https://claude.ai/code)

### Next Steps

1. Set up your `GITHUB_TOKEN` environment variable
2. Restart Claude Code or your IDE
3. Test by asking Claude Code about your GitHub repository
4. Refer to CLAUDE.md for other configured agents and tools
