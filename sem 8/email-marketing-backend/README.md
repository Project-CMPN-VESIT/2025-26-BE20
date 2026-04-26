# 📧 Email Marketing Platform Backend

## Project: Email Marketing Backend (Mailchimp Clone)

This repository hosts the backend services for a full-featured email marketing platform, inspired by Mailchimp. Built with **Laravel 12**, this backend powers user management, subscriber segmentation, email campaign creation and sending, automation workflows, and performance analytics.

This project is designed to serve as a robust and scalable foundation for email marketing operations, supporting a team of marketers in managing their audience and campaigns effectively.

## 🚀 Features

This project aims to deliver a comprehensive set of features across several phases.

### Core MVP Features (Delivered within 4 months)

* **Authentication & User Management:** Secure Signup/Login (Laravel Sanctum), Password Reset, Email Verification, Role-Based Access Control (Super Admin, Workspace Admin, Marketer, Viewer).
* **Organizations & Teams:** Workspace/Organization creation, team member invitation and role assignment.
* **Email List Management (Audience):** Create, import (CSV), and export email lists. Basic tagging and segmentation, email validation, and deduplication.
* **Email Campaign Creation:** Step-by-step wizard to define subject, preview text, sender details, and audience selection.
* **Email Template Builder:** Basic WYSIWYG editor for email content, saving reusable templates, HTML source editing.
* **Campaign Scheduling:** Immediate sending or scheduling for a future date/time.
* **Email Sending Engine:** Integration with third-party services (Mailgun/SendGrid/AWS SES). Backend job queue system for reliable dispatch (Laravel Queues + Horizon with Redis). Basic bounce and unsubscribe handling.
* **Automation Workflows (MVP):** Simple automation flows with triggers (e.g., New subscriber) and actions (e.g., Send welcome email, apply tag).
* **Campaign Reports & Analytics:** Tracking of open rate, click rate, bounce rate, unsubscribe rate. Basic link tracking.
* **Activity Logs:** Audit trail for important user actions.
* **Subscriber Engagement Tracking:** Per-subscriber tracking of email opens, link clicks, campaign history, and delivery status (bounce/unsubscribed/complained).
* **Admin Dashboard (Basic):** Overview of system health, email delivery logs, and queue status.
* **Robust Testing:** Thorough manual QA, automated tests (Unit, Feature, E2E), and basic load testing.

### Optional / Nice-to-Have Features (Future Considerations)

* User Billing (Stripe integration, plan-based limits).
* Advanced Automation Builder (Visual drag-and-drop, more triggers/actions).
* Drag-and-Drop Email Builder (Full visual editor, pre-designed templates).
* E-Commerce Integrations (Shopify, WooCommerce, abandoned carts).
* Advanced Analytics & Heatmaps.
* Deliverability Optimization Tools (Spam score, SPF/DKIM management, inbox preview).
* Multi-Language / Localization.
* Mobile-Friendly Web App / PWA considerations (Frontend responsibility).
* Transactional Email Service.
* Granular Team Permissions & Audit Logs.
* Advanced Subscriber Engagement Metrics (Engagement score, behavior-based auto-tagging).

## 🛠️ Tech Stack (Backend)

* **Framework:** Laravel 12
* **Language:** PHP 8.3+
* **API Authentication:** Laravel JWT
* **Queue Management:** Laravel Horizon (with Redis)
* **Database:** MySQL
* **Cache/Queue Driver:** Redis
* **Email Sending:** Integration with Mailgun, SendGrid, or AWS SES APIs
* **Billing (Optional):** Stripe SDK
* **Monitoring & Error Tracking (Recommended):** Sentry, Bugsnag (Laravel Telescope for local development)
* **CI/CD:** GitHub Actions, GitLab CI, or Jenkins (as configured in the main project)
* **Version Control:** Git

## ⚙️ Getting Started

Follow these instructions to get the backend up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

* **PHP:** Version 8.3+ (Check with `php -v`)
* **Composer:** PHP Dependency Manager (Check with `composer -V`)
* **MySQL Server:** based on your `DB_CONNECTION`.
* **Redis Server:** For caching and queues.
* **Git:** Version control system.

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://gitlab.com/sawant.tushar/email-marketing-backend.git](https://gitlab.com/sawant.tushar/email-marketing-backend.git)
    cd email-marketing-backend
    ```

2.  **Install PHP dependencies:**
    ```bash
    composer install
    ```

3.  **Create environment file:**
    ```bash
    cp .env.example .env
    ```

4.  **Configure `.env` file:**
    Open the newly created `.env` file and update the following settings:
    * **Database:**
        ```env
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=email_marketing_platform_db # Ensure this database exists
        DB_USERNAME=your_db_user
        DB_PASSWORD=your_db_password
        ```
        *(If your database name is different, update `DB_DATABASE` accordingly.)*
        *To create the MySQL database:*
        ```sql
        CREATE DATABASE IF NOT EXISTS email_marketing_platform_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        ```
    * **Application URL:**
        ```env
        APP_URL=http://localhost:8000
        FRONTEND_URL=http://localhost:3000 # Or wherever your React frontend runs
        ```
    * **Redis:**
        ```env
        REDIS_HOST=127.0.0.1
        REDIS_PASSWORD=null # Or your Redis password
        REDIS_PORT=6379
        QUEUE_CONNECTION=redis
        ```
    * **Mail Driver (for email verification, password reset, etc.):**
        ```env
        MAIL_MAILER=log # For development, emails will be logged
        # Or for actual sending (e.g., Mailgun)
        # MAIL_MAILER=mailgun
        # MAILGUN_DOMAIN=your_mailgun_domain
        # MAILGUN_SECRET=your_mailgun_secret
        ```
    * **Email Sending Service (for campaigns):** You will need to integrate with your chosen email service API within the application logic (e.g., Mailgun, SendGrid, AWS SES SDKs). This typically involves API keys and domain verification set in your `.env` or configuration.

5.  **Generate application key:**
    ```bash
    php artisan key:generate
    ```

6.  **Run database migrations:**
    This will create all the necessary tables in your configured database.
    ```bash
    php artisan migrate
    ```
    *(Optional) Seed database with initial data (e.g., a super admin user, dummy organizations):*
    ```bash
    php artisan db:seed
    ```

7.  **Start the Laravel development server:**
    ```bash
    php artisan serve
    ```
    This will typically run the API on `http://localhost:8000`.

8.  **Start the Laravel Horizon queue worker (in a new terminal tab/window):**
    This is essential for processing emails, automations, and other background jobs.
    ```bash
    php artisan horizon
    ```
    (Alternatively, for a basic queue worker without Horizon's dashboard: `php artisan queue:work`)

Your backend API should now be running and accessible.

## 🗺️ Project Roadmap (Backend Focus)

This backend project aligns with the following phased roadmap:

* **Month 1: Foundation & User Management:**
    * API Endpoints for Authentication, User CRUD, RBAC.
    * API for Organization & Team Management (create, invite, roles).
    * API for Email List Management (create, import/export CSV, validation, deduplication).
* **Month 2: Campaign Core:**
    * API Endpoints for Campaign Creation (define details, select audience).
    * API for Email Template Management (CRUD, content storage).
    * Backend logic for Campaign Scheduling.
    * Integration with Email Sending Services (Mailgun/SendGrid/SES).
    * Robust Laravel Queues and Horizon setup for reliable email dispatch.
* **Month 3: Automation & Analytics:**
    * API Endpoints for MVP Automation Workflows (triggers, actions).
    * Data collection and API for Campaign Reports (opens, clicks, bounces, etc.).
    * API and storage for Activity Logs.
    * Backend logic for Subscriber Engagement Tracking.
* **Month 4: Polish, QA & Launch:**
    * Basic Admin Dashboard APIs (system health, queue status).
    * Backend bug fixes, performance optimizations, and deployment readiness.
    * Implementation of automated tests (Unit, Feature).

## 🤝 Contributing

We welcome contributions to this project! If you'd like to contribute, please follow these steps:

1.  **Fork** the repository.
2.  **Clone** your forked repository: `git clone https://gitlab.com/your-username/email-marketing-backend.git`
3.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/my-awesome-feature`
4.  **Make your changes**, ensuring they adhere to the project's coding standards.
5.  **Write tests** for your changes.
6.  **Run tests** to ensure everything passes: `php artisan test`
7.  **Commit your changes** with a clear and concise message.
8.  **Push your branch** to your forked repository.
9.  **Create a new Merge Request** to the `main` branch of the original repository. Provide a detailed description of your changes.

## 🐛 Support

If you encounter any issues or have questions, please open an issue on the [GitLab Issue Tracker](https://gitlab.com/sawant.tushar/email-marketing-backend/-/issues).

## 📄 License

This project is open-sourced software licensed under the [MIT license](LICENSE.md). (You should create a `LICENSE.md` file in the root of your project).

## 📊 Project Status

**Active Development.** The project is currently in active development, following the outlined 4-month roadmap. We are continually building out the core features and aiming for a stable MVP release by **October 2025**.

---
*This README was generated to provide a comprehensive overview for developers. For frontend-specific instructions, please refer to the `README.md` in the frontend repository.*