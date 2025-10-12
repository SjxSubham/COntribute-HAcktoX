# Vercel Deployment Guide

This project is fully configured and ready to deploy on Vercel with zero additional configuration needed.

## Quick Deploy

Click the button below to deploy this project to Vercel in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SjxSubham/COntribute-HAcktoX)

## Deploy via Vercel CLI

1. Install the Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy your project:
```bash
vercel
```

3. Follow the prompts to complete the deployment.

## Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and sign in with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically:
   - Detect the Vite framework
   - Use the correct build settings from `vercel.json`
   - Deploy your site with optimal configuration

## Configuration

The project includes a `vercel.json` file with the following settings:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite (auto-detected)
- **SPA Routing**: All routes redirect to `index.html` for proper client-side routing

## Environment Variables

This project currently doesn't require any environment variables. If you add any in the future, you can configure them in the Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables for Production, Preview, and Development environments

## Custom Domain

After deployment, you can add a custom domain:

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain and follow the DNS configuration instructions

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to your main/master branch
- **Preview**: Every push to pull requests and other branches

## Support

For more information about Vercel deployment, visit:
- [Vercel Documentation](https://vercel.com/docs)
- [Vite on Vercel](https://vercel.com/docs/frameworks/vite)
