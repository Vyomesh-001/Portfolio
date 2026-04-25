# Portfolio Content Guide

Welcome to your new portfolio landing page! The page has been built using Vanilla HTML, CSS, and JavaScript. 
Follow these instructions to easily change the text, links, and styling.

## 1. How to Change Text Content
All the visible text on the website is located in `index.html`. Open `index.html` in your text editor (like VS Code or Notepad).

Search for the `<!-- EDIT: ... -->` comments in the HTML code. These comments point directly to what you can change.

For example, to change your name:
```html
<!-- EDIT: Update your name -->
<h1 class="name">ABHAY RANA</h1>
```
Change `ABHAY RANA` to your actual name.

To change your email address for the copy button:
```html
<!-- EDIT: Update your email address -->
<div class="email-container" onclick="copyEmail()">
    <span id="email-text">hi@abhayrana.com</span> ...
```
Change `hi@abhayrana.com` to your email.

## 2. How to Update Links
In the navigation bar (`<nav>`), you will see a list of links:
```html
<li><a href="#about">About</a></li>
```
Currently, these link to `#id` anchors on the same page. If you create new pages (like `about.html`), you can change the `href` attribute like this:
```html
<li><a href="about.html">About</a></li>
```

For the "Resume" link, replace `#resume` with the path to your PDF file:
```html
<li><a href="assets/my-resume.pdf" class="resume-link" target="_blank">Resume</a></li>
```

## 3. How to Change Colors
The colors are managed using CSS variables. Open `style.css` and look at the very top:
```css
:root {
    --bg-color: #08080a;
    --text-primary: #ffffff;
    --accent-red: #ff3344;
    /* ... */
}
```
If you want to change the red button and badge to blue, simply change `--accent-red: #ff3344;` to `--accent-red: #3366ff;`.

## 4. How to Change the Star Background
If you want to adjust the stars, open `script.js`.
At the top, you will see `const numStars = 150;`. You can increase this number for more stars, or decrease it for less.

Enjoy your new portfolio!
