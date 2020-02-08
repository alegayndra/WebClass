# Security

## Be careful of:
- Privacy
- Integrity
- Authenticity

## Cross Site Scripting (XSS)

The user sends a script inside the request to the server  

1. Sanitize
    - Escape special characters
    - Encode
    - Regular expression
2. Allow / Restrict Keywords
3. Validate / Encrypt

## SQL Injection

Three types
1. 1st order
    - lowest risk
    - just surpassess authentici
    - Access to DB but no harm to DB
    - How to protect:
        - Sanitize
        - Use question marks in the querry (have no idea how that works)
        - Wildcards
2. 2nd order
    - Affects DB functionality
    - Procedure
    - Trigger
    - How to protect:
        - Sanitize
        - Wildcards
3. 3rd order (lateral)
    - Complete access to DB
    - Attacker knows the DB Schema
    - How to protect:
        - Sanitize
        - Wildcards
        - Validations
        - Encrypt data

## Phishing / Spamming

- There's NOTHING in code to protect
- Tell users about what we do and what we don't do
- Tell users to look at remitent on emails
- Send messages

## Botnets

Plugins / Algorithms to make sure that a machines is not doing something on behalf of a user

CAPTCHA

## Encryption

- Salt: how many times the message passess through the algorithm
- public key

Types:
- Assymetric
    - Uses a private key
- Symetric

