# MCP Servers - Quick Setup Guide

## What is MCP?

**Model Context Protocol (MCP)** allows Claude Code to integrate with external tools and services. This project has two MCP servers configured:

### 1. **Angular MCP** - Framework Documentation & Guidance
- Real-time Angular documentation access
- API reference and examples
- Best practices and patterns

### 2. **GitHub MCP** - Repository & Code Management
With the GitHub MCP server configured, Claude Code can:

- Interact with your GitHub repositories directly
- Create and manage pull requests
- View and manage issues
- Search code across your repos
- Access commit history and branches

## Quick Setup

### Angular MCP (Zero Setup Required!)

The Angular MCP is ready to use immediately! No configuration needed.

**Test it:** Ask Claude Code in your IDE:
```
"What are the best practices for Angular component design?"
```

---

### GitHub MCP (5 minute setup)

#### Step 1: Generate GitHub Token

1. Visit: https://github.com/settings/tokens
2. Click: **"Generate new token"** → **"Generate new token (classic)"**
3. Configure:
   - **Token name**: `Claude Code - Portfolio`
   - **Expiration**: 90 days (rotate regularly for security)
   - **Scopes**: Check these boxes:
     - ☑ `repo` - Full control of repositories
     - ☑ `read:user` - Read user profile
4. Click **"Generate token"**
5. **Copy the token** (you won't see it again!)

#### Step 2: Set Environment Variable

**Windows PowerShell (Run as Administrator):**
```powershell
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxxxxxxxxxxxxxxxxxxx", "User")
```

Replace `ghp_xxxxxxxxxxxxxxxxxxxx` with your actual token.

**Verify it worked:**
```powershell
$env:GITHUB_TOKEN
# Should display your token
```

#### Step 3: Restart Claude Code

Close and reopen Claude Code (or your IDE with Claude Code).

## ✅ Verification

Once restarted, try this in Claude Code:

```
"What repositories do I have on GitHub?"
```

If Claude Code lists your repositories, the GitHub MCP is working!

## Usage Examples

### Pull Requests
```
"Create a pull request to add TypeScript strict mode configuration"
"List all open pull requests"
"Show me the changes in PR #42"
```

### Issues
```
"Create an issue about improving modal components"
"List all issues labeled 'bug'"
"Close issue #15 with a comment"
```

### Code Search
```
"Search for TODO comments in my code"
"Find all files using the Work interface"
```

### Repository Info
```
"Show me the last 10 commits"
"What branches do I have?"
"Get repository statistics"
```

## 🔒 Security Best Practices

### Do's ✅
- Use environment variables for tokens (never commit them)
- Rotate tokens regularly (every 90 days)
- Use minimal required scopes
- Keep tokens in secure system environment

### Don'ts ❌
- Never commit tokens to Git
- Don't share your token with others
- Don't use tokens in shell scripts or config files
- Don't commit `.env` files with tokens

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "GitHub MCP not available" | Restart Claude Code after setting `GITHUB_TOKEN` |
| "Permission denied" | Check token scopes at https://github.com/settings/tokens |
| "Token not found" | Verify environment variable: `$env:GITHUB_TOKEN` in PowerShell |
| "Connection refused" | Check internet connection and GitHub status |

## Configuration Files

- **`.mcp/github.json`** - MCP server configuration (COMMIT this)
- **`.mcp/README.md`** - Detailed documentation (COMMIT this)
- **`.mcp/SETUP.md`** - This file (COMMIT this)
- **System `GITHUB_TOKEN`** - Your token (NEVER commit this)

## Next Steps

1. ✅ Generate token
2. ✅ Set environment variable
3. ✅ Restart Claude Code
4. 🧪 Test with GitHub API calls
5. 📚 Read `.mcp/README.md` for advanced usage

## Learn More

- [GitHub MCP Server](https://github.com/github/github-mcp-server)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [MCP Protocol](https://modelcontextprotocol.io/)
