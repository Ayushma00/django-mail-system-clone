
# Django Email System Clone (CS50 Project)

This project is a Django-based email system clone developed as part of the CS50 Web Programming course. It provides users with functionalities similar to a basic email service, allowing them to manage their inbox, send emails, view, reply, and archive/unarchive messages.

## Demo

A demo of the project can be found on YouTube: [Demo Link](https://youtu.be/eBwqIMvIogU)

## Getting Started

1. **Installation**: Clone the repository and install dependencies:

    ```bash
    git clone https://github.com/your-username/django-email-system.git
    cd django-email-system
    ```

2. **Database Migration**: Apply database migrations:

    ```bash
    python manage.py migrate
    ```

3. **Run the Server**: Start the development server:

    ```bash
    python manage.py runserver
    ```

4. **Access the Application**: Open your web browser and navigate to `http://localhost:8000`

## Usage

1. **Registration/Login**: Register for a new account or log in using existing credentials. You can use any email address and password for this project; they do not need to be valid for actual email addresses.

2. **Mailboxes**: Navigate between Inbox, Sent, and Archived mailboxes to manage your emails.

3. **Compose Email**: Click on "Compose" to create and send emails to other users.

4. **View Email**: Click on an email to view its content. Emails are displayed with sender, recipients, subject, timestamp, and body.

5. **Reply to Email**: While viewing an email, click on "Reply" to compose a reply to the sender.

6. **Archive/Unarchive Email**: Archive or unarchive emails to organize your inbox.

## API Routes

This application provides the following API routes for interacting with emails:

- **GET /emails/<mailbox>**: Retrieve a list of emails in the specified mailbox (inbox, sent, or archive).
- **GET /emails/<email_id>**: Retrieve details of a specific email by its ID.
- **POST /emails**: Send a new email with recipients, subject, and body.
- **PUT /emails/<email_id>**: Update an existing email (mark as read/unread, archive/unarchive).

## Implementation Details

- **JavaScript**: The application is implemented as a single-page app using JavaScript to control the user interface.
- **HTML/CSS**: The user interface is designed using HTML and styled using CSS.
- **Django Backend**: The backend is built using Django, providing APIs for email management.

## Acknowledgments

This project is based on the CS50 Web Programming course. Special thanks to CS50 for providing the project idea, guidance, and API specifications.

