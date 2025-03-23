
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/09ed6906-c9bb-4848-8afd-f93caee3a8d0

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/09ed6906-c9bb-4848-8afd-f93caee3a8d0) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Using Lovable's built-in deployment

Simply open [Lovable](https://lovable.dev/projects/09ed6906-c9bb-4848-8afd-f93caee3a8d0) and click on Share -> Publish.

### Using a custom domain with Netlify

Lovable doesn't currently support custom domains directly. If you want to deploy your project under your own domain, we recommend using Netlify:

1. Create a Netlify account at [netlify.com](https://www.netlify.com/) if you don't have one already
2. Install the Netlify CLI: `npm install -g netlify-cli`
3. Clone your project repository locally
4. Navigate to your project directory: `cd <project-directory>`
5. Login to Netlify: `netlify login`
6. Initialize Netlify in your project: `netlify init`
   - Choose "Create & configure a new site"
   - Follow the prompts to select your team and site name
7. Build your project: `npm run build`
8. Deploy to Netlify: `netlify deploy --prod`
9. After deployment, go to the Netlify dashboard for your site
10. Navigate to "Domain settings" to add and configure your custom domain
11. Follow Netlify's instructions to set up DNS records for your domain

For SSL/TLS configuration with your custom domain:
- Netlify provides free SSL certificates through Let's Encrypt automatically
- Ensure your DNS records are properly configured
- Allow time for DNS propagation and SSL certificate issuance (usually 24-48 hours)

For detailed instructions, see [Netlify's custom domain documentation](https://docs.netlify.com/domains-https/custom-domains/).

## Troubleshooting SSL errors

If you're seeing SSL errors like "ERR_SSL_VERSION_OR_CIPHER_MISMATCH":
- Verify your DNS records are correctly pointing to your hosting provider
- Ensure SSL/TLS certificates are properly set up and not expired
- Check if your hosting service has completed SSL certificate provisioning
- Clear your browser cache or try accessing the site in incognito mode

