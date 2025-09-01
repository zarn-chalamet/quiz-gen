# QuizGenAI

Create, study, and share quizzes & flashcards — either manually or from uploaded PDF/DOC files — powered by Google Gemini. Built with React (frontend) and Spring Boot (backend), secured with Clerk.

---

## Features

* **Two creation modes**

  * **Manual:** Compose quizzes and flashcards directly in the UI.
  * **Upload:** Generate from **PDF/DOC** files. (Specify **quantity** to control the number of questions/cards.)
* **Learn & Practice**

  * Study flashcards with flip/mark-known flow.
  * Take quizzes and see scoring/feedback.
* **Authentication** with **Clerk** (sign in/up, session management).
* **AI-powered** content generation via **Google Gemini**.
* **Spring Boot** backend with REST APIs.
* **React** frontend with a clean, responsive UI.
* **Extensible** prompts, parsers, and generation strategies.

## Tech Stack

**Frontend:** React, Vite, JavaScript, Tailwind

**Backend:** Spring Boot, Java 21, Spring Web, Spring Data Mongodb

**Auth:** Clerk (JWT tokens to backend)

**AI:** Google Gemini API

**Document Parsing:** Spring-based PDF/DOC text extraction (PDF Document Reader)

**Build/Infra:** Node.js, Maven

> Replace items in parentheses with your exact libs if different.

## Architecture

```
+---------------------+         JWT            +----------------------+
|      React UI       |  <------------------>  |     Clerk (Auth)     |
|  (Quiz/Flashcards)  |                        +----------------------+
|  Upload / Manual    |  REST/JSON             +----------------------+
+----------+----------+  ------------------>   |   Spring Boot API    |
           |                                    |  /api/quiz, /api/fc  |
           |  file upload + quantity            |  Parse + Generate    |
           v                                    +----------+-----------+
    +------+--------------------------+                    |
    |   Document Parser (PDF/DOC)     |  extracted text    |
    |  (PDFBox/POI via Spring)        |  ------------------+
    +---------------+-----------------+                    |
                    |                                  prompt
                    v                                     |
                +---+-----------------------------+       v
                |     Google Gemini (LLM)         |  generated items
                +---------------------------------+       |
                                                        v
                                              +---------+---------+
                                              |  Storage/Database |
                                              +-------------------+
```

## How It Works

### Document Parsing

* When a user uploads a PDF/DOC, the backend extracts text via Spring utilities (e.g., **Apache PDFBox** for PDF, **Apache POI** for DOC/DOCX).
* Extracted text is normalized (remove headers/footers, merge hyphenated lines, trim whitespace) before prompt construction.

### AI Generation (Gemini)

* The backend assembles a **prompt** using the extracted text and the **quantity** requested by the user.
* Calls **Google Gemini** with guardrails (max tokens, temperature, schema hints) to produce:

  * **Quiz questions** (MCQ/short answer) with answers & explanations where possible
  * **Flashcards** as `{ front, back }`
* The result is validated and lightly post-processed (JSON shape, empty field checks) before returning to the frontend.

### Quiz & Flashcard Flows

* **Manual Mode:**

  * Users add/edit/delete items before saving.
* **Upload Mode:**

  * Users choose a file + set **quantity**.
  * Backend parses → prompts Gemini → returns generated items.
* **Learning:**

  * Flashcards: flip, mark known/unknown; progress stored.
  * Quizzes: select answers, submit, receive score & review.

---

## Security

* **Clerk** protects the frontend; send the **JWT** to the backend on each call.
* Validate and verify tokens server-side (issuer/audience/expiry).
* Sanitize & size-limit uploads; verify file types (PDF/DOC/DOCX) and enforce max **quantity**.
* Avoid storing raw uploads long-term; use temp directories or object storage with TTL if needed.
* Rate-limit generation endpoints to prevent abuse.
* Log errors without leaking prompt or PII.

---

## Screenshots

<img width="1602" height="831" alt="quiz-gen-home" src="https://github.com/user-attachments/assets/768f299a-193b-4deb-9189-e140a2245116" />

<img width="1601" height="832" alt="gen-ai-dash1" src="https://github.com/user-attachments/assets/29b83be2-194a-4a5f-beb7-db341c969acf" />

<img width="1597" height="835" alt="gen-ai-dash2" src="https://github.com/user-attachments/assets/06d0d717-1d8b-44d3-9c5b-ef15c238beda" />
<img width="1597" height="830" alt="gen-ai-my" src="https://github.com/user-attachments/assets/8d79cc99-1d81-48bf-9924-d83b432feae1" />
<img width="1596" height="832" alt="gen-ai-create-quiz" src="https://github.com/user-attachments/assets/c516810d-cc68-4959-866b-cad3c6e619c8" />
<img width="1593" height="837" alt="gen-ai-upload-quiz" src="https://github.com/user-attachments/assets/d21a4817-9fcd-4acc-bae1-d81b2bb620fa" />

---


## Roadmap

* [ ] Rich text cleaning for better prompts
* [ ] Support images in prompts (OCR)
* [ ] More question types (true/false, fill-in-the-blank)
* [ ] Deck sharing & collaboration
* [ ] Export to Anki/CSV
* [ ] i18n/localization
* [ ] Offline study mode


