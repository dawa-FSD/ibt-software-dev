Responsive Menu

Project Description

This project is a responsive and animated restaurant menu. The menu layout adapts to different screen sizes and provides a smooth hover effect on each menu card.

Folder Structure

responsive-menu/
│
├── menu.html
├── menu.css
└── README.md

Requirements

- Add the responsive viewport meta tag.
- Use a mobile-first approach.
- Display menu cards in one column on mobile.
- Display two columns at screens 768px and above.
- Display three columns at screens 1024px and above.
- Add a smooth hover transition to each card.
- Use "translateY()" and/or "scale()" for the hover effect.
- Add a "prefers-reduced-motion" media query.
- Make sure the layout works smoothly from 360px to 1280px.

Responsive Breakpoints

Screen Size| Layout
360px – 767px| 1 column
768px – 1023px| 2 columns
1024px and above| 3 columns

Animation

Each menu card has a hover effect:

- Moves slightly upward using "translateY()"
- Grows slightly using "scale()"
- Uses a smooth CSS transition

For users who prefer reduced motion, the animation is disabled using:

@media (prefers-reduced-motion: reduce)

Self-Check List

- [x] Viewport meta tag added
- [x] Mobile-first layout
- [x] One-column mobile layout
- [x] Two-column layout at 768px
- [x] Three-column layout at 1024px
- [x] Card hover transition
- [x] "translateY()" / "scale()" animation
- [x] Reduced-motion accessibility support
- [x] Tested from 360px to 1280px

Technologies Used

- HTML5
- CSS3
- CSS Grid
- Media Queries
- CSS Transitions
- CSS Transform

How to Run

1. Open the project folder.
2. Open "menu.html" in a web browser.
3. Resize the browser window to test the responsive layout.
4. Hover over the menu cards to see the animation.
