# NYXSUS - School Organization Web Interface

An academic web project presenting an interface for school organization discovery and club management. Built with HTML, CSS, JavaScript, and Tailwind CSS.

## Project overview

The repository includes a landing page, organization browsing, login and registration pages, and a dashboard interface. It demonstrates frontend layout, styling, and browser interactions; these screens alone do not establish a production backend or authentication service.

## Repository guide

| Location | Purpose |
| --- | --- |
| `index.html` | Landing page and organization discovery |
| `dashboard.html` | Dashboard interface |
| `login.html`, `register.html` | Account interface pages |
| `scripts/` | Browser-side JavaScript |
| `assets/` | Images and other media |
| `input.css`, `tailwind.css` | Tailwind source and compiled styles |
| `mock_data/` | Mock data used by the interface |

## Local development

Serve the repository with a local static server, such as the VS Code Live Server extension or an installed `live-server` command:

```sh
live-server .
```

Open `index.html` through that server. The compiled `tailwind.css` is included. The existing Tailwind development command, when a compatible CLI is installed, is:

```sh
tailwindcss -i ./input.css -o ./tailwind.css --watch
```

## Academic context

Created as a school web development project. This repository is part of my academic programming portfolio.
