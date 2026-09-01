# Amirul Cyber Blog

Jekyll blog powered by the [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) theme.

## Setup Instructions

### Prerequisites
- Ruby 3.0 or higher
- Bundler
- Git

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/amirulcyber/amirulcyber.github.io.git
   cd amirulcyber.github.io
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Build and serve locally:
   ```bash
   bundle exec jekyll serve
   ```

4. Open your browser and visit: `http://localhost:4000`

### Creating New Posts

Create a new file in `_posts/` with the format: `YYYY-MM-DD-title.md`

Example front matter:
```markdown
---
title: Post Title
date: YYYY-MM-DD HH:MM:SS +0800
categories: [Category1, Category2]
tags: [tag1, tag2]
---
```

### Deployment

Simply push to the `main` branch and GitHub Pages will automatically build and deploy your site.

## Features

- ✅ Responsive design
- ✅ Dark mode support
- ✅ Comments via Utterances
- ✅ SEO optimized
- ✅ Tag and category support
- ✅ Search functionality

## Site Information

- **Title**: Amirul Cyber
- **Description**: CyberSec | Research | South East Asia
- **URL**: https://amirulcyber.github.io
- **Theme**: Chirpy Jekyll Theme

## License

MIT
