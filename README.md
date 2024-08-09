# Zapier Clone

🚀 This is a **Zapier clone** built with a modern tech stack including:

- **Frontend**: Next.js with TypeScript
- **Backend**: Express.js with Node.js
- **Database**: PostgreSQL
- **Messaging**: Kafka
- **Email Service**: Brevo (Sendinblue) with worker implementation

This project uses Docker to set up the database and Kafka instance.

---

## 🛠️ Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/SujeetPawar/zapier_project.git
cd zapier_project
```

### 2. Docker Setup

#### PostgreSQL

Run a PostgreSQL instance using Docker:

```bash
docker run -p 5431:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```
#### Kafka

Run a Kafka instance using Docker:

```bash
docker run -p 9092:9092 apache/kafka:3.7.1
```
#### Create Kafka Topic

Create a Kafka topic named `Zap_event`:

```bash
bin/kafka-topics.sh --create --topic Zap_event --bootstrap-server localhost:9092
```
### 3. Environment Variables Setup

Go to each folder (`frontend`, `primary-backend`, `hooks`, `processor`, `worker`) and create a `.env` file with the following content:

#### For All Folders

Create a `.env` file with:

```env
DATABASE_URL=<Your Postgres Docker URL>
```

#### For `primary-backend` Folder
Create a `.env` file in the `primary-backend` folder with the following content:

```env
DATABASE_URL=<Your Postgres Docker URL>
JWT_PASSWORD=<Your JWT Secret>
```
#### For `worker` Folder
Create a `.env` file in the `worker` folder with the following content:

```env
DATABASE_URL=<Your Postgres Docker URL>
SMTP_USERNAME=<Your SMTP Username>
SMTP_PASSWORD=<Your SMTP Password>
SMTP_ENDPOINT=<Your SMTP Endpoint>
```

### 4. Install Dependencies and Run the Project

Navigate to each folder (`frontend`, `primary-backend`, `hooks`, `processor`, `worker`) and run the following commands:

```bash
npm install
npm run dev
```
## 🛠️ Quick Fixes

- **Prisma Repetition**: The `prisma` setup is repeated across multiple folders. Consider using **Turborepo** or **Monorepo** to streamline the codebase. Create a pull request to consolidate the `prisma` setup.
- **Logout Feature**: Implement a logout feature to enhance the user experience and provide a complete authentication flow.






