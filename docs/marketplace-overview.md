# Marketplace — Project Overview

## 1. Overview

Marketplace is a classifieds-style web application for buying and selling physical goods.

- A single account type, `User`, supports both posting items for sale and buying items from other users; there are no separate buyer and seller roles.
- Anyone can browse public listings. Only logged-in users can post, edit, delete, buy, or favorite listings.
- Buying a listing is a state change on the listing itself (from `ACTIVE` to `SOLD`); there is no separate `Order` or `Transaction` entity.

## 2. Tech Stack

### Backend

- Java 17
- Spring Boot 3.3
  - Spring Web
  - Spring Data JPA
  - Spring Validation
  - Spring Security Crypto (BCrypt password encoding)
- JWT authentication (`jjwt`)
- H2 file-based database
- Maven

### Frontend

- Angular 18
  - Standalone components
  - Reactive Forms
  - Angular Router
- TypeScript
- RxJS
- Karma + Jasmine for testing

## 3. Features (Implemented)

### Accounts & Auth

- Registration and login with username + password; passwords are stored hashed with BCrypt.
- JWT-based sessions: the backend issues a JWT on login and the frontend includes it on authenticated requests.
- Logout clears the stored token on the client.
- Password reset flow:
  - A reset token is generated server-side.
  - The token is "sent" through a stubbed email channel that logs the reset link to the console (no real email is dispatched).

### Listings

- A logged-in user can post a new listing with title, description, price, category, and 1–6 photos.
- The first uploaded photo is the cover image shown on the browse feed.
- Owners can edit or delete only their own `ACTIVE` listings.
- Photo management is independent of the listing text fields: owners can add, remove, and reorder photos separately.

### Browse

- Public listing feed available to all visitors.
- Text search over listings.
- Category filtering.
- Minimum / maximum price filtering.
- Sorting by newest, price ascending, and price descending.
- Pagination.

### Buying

- Any logged-in user other than the listing owner can buy an `ACTIVE` listing.
- After purchase, the listing status becomes `SOLD`.
- A `SOLD` listing is locked from further edits, deletion, or photo changes.

### Favorites

- Logged-in users can favorite any listing regardless of its status or ownership.
- A "My Favorites" page lists every favorited listing.

### My Listings

- Dashboard showing:
  - Listings the user has posted.
  - Listings the user has bought.

### Public Profiles

- A public, unauthenticated profile page per username.
- Shows only the user's currently `ACTIVE` listings.
- Listing cards and listing detail pages link to the owner's public profile.

### Responsive UI with Dark Mode

- Shared design system (design tokens, buttons, forms, cards) applied across every page.
- Light and dark themes follow the OS-level preference.
- Responsive layout for different screen sizes.

## 4. Planned / Not Yet Built

- **In-app messaging**: direct messages between a listing's owner and an interested buyer.
- **Notifications**: automated alerts such as "your listing sold" and "new message".
- **Post-sale ratings**: buyer and seller can rate each other after a transaction.

For the full backlog of ideas, see [`improvements.md`](../../improvements.md).

## 5. Project Structure

```
backend/    Spring Boot REST API (Maven project)
  src/main/java/com/marketplace/backend/
    auth/       registration, login, JWT issuing, password reset
    listing/    listing CRUD, browse/search/sort/pagination, photos
    favorite/   favoriting listings
    user/       user profiles
    photo/      photo storage
    email/      stubbed email sender
  src/test/     backend HTTP-level API tests (MockMvc)

frontend/   Angular SPA
  src/app/
    auth/       login, register, password reset UI
    listings/   browse, listing detail, create/edit, my-listings, my-favorites
    profile/    public user profile page
  src/app/*.component.spec.ts   Angular TestBed component specs

docs/
  specs/      feature specs (implemented and planned)
  adr/        architecture decision records

CONTEXT.md        domain glossary / ubiquitous language
FEATURE_MAP.md    index of where each feature lives in the codebase
improvements.md   feature/styling backlog
```

- `backend/` — REST API, business logic, persistence, and HTTP-level tests.
- `frontend/` — Angular single-page application and component specs.
- `docs/specs/` — feature specifications and project documentation.
- `docs/adr/` — architecture decision records.
- `CONTEXT.md` — domain glossary and ubiquitous language definitions.
- `FEATURE_MAP.md` — index mapping each feature to its implementation location.
- `improvements.md` — backlog of future features and styling ideas.

## 6. Getting Started

### Prerequisites

- Java 17 or later
- Maven
- Node.js and npm

### Run the Backend

```bash
cd backend
mvn spring-boot:run
```

The API starts at `http://localhost:8080` and uses a local H2 database file under `backend/data/`.

### Run the Frontend

```bash
cd frontend
npm install
npm start
```

The Angular dev server starts at `http://localhost:4200`. API requests under `/api` are proxied to the backend via `frontend/proxy.conf.json`.

### Run Tests

Backend (JUnit + MockMvc):

```bash
cd backend
mvn test
```

Frontend (Karma + Jasmine):

```bash
cd frontend
npm test
```
