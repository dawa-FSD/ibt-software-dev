# Validated Persistent Signup Form

## Description

This project is a validated signup form built with HTML and JavaScript.

The form accepts a user's name and Ethiopian phone number.

The name must contain at least two characters.

The phone number must match the Ethiopian phone regex:

/^(?:\+251|0)9\d{8}$/

Valid signup information is saved to localStorage as JSON.

Saved signup information is restored when the page is reloaded.

The page also displays the number of people who have signed up.

## Requirements

- Labelled name input
- Labelled phone input
- Submit button
- Error area
- preventDefault()
- Trimmed input values
- Name validation
- Ethiopian phone validation
- Regular expression
- Specific error messages
- localStorage
- JSON.stringify()
- JSON.parse()
- try/catch
- Restore data on reload
- Signup count
- textContent

## Valid Phone Examples

0912345678

0998765432

+251912345678

+251998765432

## Invalid Phone Examples

091234

1234567890

251912345678

+25191234

## How to Open

Open index.html in a web browser.

## Self-Check

- [ ] Empty name is rejected.
- [ ] Short name is rejected.
- [ ] Invalid phone is rejected.
- [ ] Valid 0... phone is accepted.
- [ ] Valid +251... phone is accepted.
- [ ] Clear error messages are displayed.
- [ ] First validation problem is displayed.
- [ ] Valid data is saved to localStorage.
- [ ] Form is cleared after successful signup.
- [ ] Saved data survives page reload.
- [ ] Signup count is shown on load.
- [ ] Missing storage is handled.
- [ ] Corrupt storage is handled.
- [ ] textContent is used for messages.
