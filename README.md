# digikare-didomi

## Getting Started

- Clone this repository
- `cd digikare-didomi`
- `npm install`

## Configuration

Create a .env file and define the following :

- `JWT_SECRET` - JSON Web Token encryption password
- `JWT_TIME` - JSON Web Token expiration time (default: 10 minutes)

## Technical choices

- Typescript
- Sequelize
- SQLite
- Jest
- ESLint

## Available Commands

- `debug` - Launch the server in debug mode using ts-node-dev
- `start` - Start the compiled version of the server
- `clean` - Remove directories (`coverage`, `build`, `tmp`)
- `build` - Build project
- `build:watch` - Build project watch
- `build:release` - Build project for release
- `lint` - Lint source files and tests
- `test` - Run tests
- `test:watch` - Interactive watch mode to automatically re-run tests

## API Routes

| Route   | Method  |                     | Body                                                                            | Params  |
|---	    |---	    |---	                |---	                                                                            |---	    |
| /users  | POST    | Create a new User   | { email: string! }                                                              |  - 	    |
| /users  | GET     | Get current User    | -                                                                               |  - 	    |
| /users  | DELETE  | Delete current User | -                                                                               |  - 	    |
| /events | POST    | Create a new Event  | { id: string ("email_notifications"|"sms_notifications")!, enabled: boolean! }  |  - 	    |
