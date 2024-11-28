# Role-Based Access Management (RBAC) Project

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Access Control Mechanisms](#access-control-mechanisms)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Overview

This is a full-stack Role-Based Access Control (RBAC) project that provides dynamic role and permission management with granular access control.

## ✨ Features

- Dynamic role and permission management
- Two-level access control:
  - Element-level access management
  - Component-level access management
- Granular CRUD permissions for sidebar items

## 🛠 Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v16 or later)
- npm (v8 or later)
- Git

## 💻 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/rbac-project.git
cd rbac-project
```

### 2. Set Up Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Set Up Backend

Open a new terminal window:

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```


## 🔐 Access Control Mechanisms

### Element-Level Access Management

The `PermissionWrapper` component provides fine-grained control over individual elements:

```typescript
<PermissionWrapper 
  componentName="Authors" 
  operationType="create"
>
  <CreateAuthorButton />
</PermissionWrapper>
```

### Component-Level Access Management

The `withComponentRoles` HOC manages access to entire components:

```typescript
const ProtectedAuthorsPage = withComponentRoles(AuthorsPage, "Authors");
```


For any questions or issues, please open an issue in the GitHub repository or contact me.
