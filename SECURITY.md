# Security Guidelines

## Protecting Personal Information

This project contains sensitive information that should never be committed to version control:

### Files to Keep Private
- `.env` - Contains email credentials and database passwords
- `config/personal.ts` - Contains personal contact information

### Before Committing to Git
1. Ensure `.env` is listed in `.gitignore`
2. Use `.env.example` as a template for others
3. Never commit actual passwords or API keys
4. Review all files before pushing to GitHub

### Setup Instructions for New Developers
1. Copy `.env.example` to `.env`
2. Fill in your own credentials in `.env`
3. Copy `config/personal.example.ts` to `config/personal.ts`
4. Update with your personal information

### If You Accidentally Commit Sensitive Data
1. Remove the file from git: `git rm --cached filename`
2. Add the file to `.gitignore`
3. Commit the changes
4. Consider changing any exposed passwords immediately

## Email Security
- Use app-specific passwords for email services
- Never use your main account password in code
- Enable 2-factor authentication on your email account