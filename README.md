# playgali.github.io

Personal GitHub Pages site for Galileo Martinez.

The site is a static resume/portfolio page focused on DevOps, security, cloud
infrastructure, reliability engineering, Kubernetes, CI/CD, and observability.
It is published through GitHub Pages from this repository.

## Contents

- `index.html` - main static site.
- `GalileoMartinez.pdf` - downloadable CV.
- `CNAME` - custom domain configuration for `galileomtz.com`.
- `Dockerfile` - optional local Nginx container for previewing the site.
- `assets/` - CSS, JavaScript, images, fonts, and theme assets used by the page.

## Local Preview

Open `index.html` directly in a browser, or build and run the Nginx preview
container:

```bash
docker build -t playgali-site .
docker run --rm -p 8080:80 playgali-site
```

Then visit:

```text
http://localhost:8080
```

## Deployment

GitHub Pages serves the default branch for this repository. The `CNAME` file
configures the custom domain.

## License

This project is licensed under the GNU General Public License v3.0 or later.
See `LICENSE` for details.
