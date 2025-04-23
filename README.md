# People Manager

A responsive, internationalized React-based dashboard for managing people data.  
This project includes features such as pagination, server-side search, modal editing/deletion, toast notifications, and data visualization via MUI DataGrid.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js v23** installed.

You can check your Node version with:

```bash
node -v
```

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/DusterCoder/people-manager.git
cd people-manager
npm install
```

### Run the application

```bash
npm run dev
```

Then open your browser and go to:

```
http://localhost:3000
```

---

## 🌍 Features

- ⚡ Fast & responsive UI built with **React** and **MUI**
- 🌐 Full i18n support via **react-i18next**
- 🔍 Server-side pagination & filtering
- 🧾 Editable user list with modals (edit/delete)
- 🔔 Error and success feedback via toast notifications (`react-hot-toast`)
- 📱 Mobile-friendly layout with adaptive design
- 🧠 Debounced search input to reduce API calls

---

## 🛠️ Stack

- **React**
- **TypeScript**
- **MUI (Material UI)**
- **react-i18next**
- **react-hot-toast**
- **Vite** (or your current dev server)

---

## 📂 Project Structure (simplified)

```
src/
│
├── components/
│   ├── PeopleTable.tsx
│   ├── EditUserModal.tsx
│   ├── DeleteUserModal.tsx
│   ├── SearchBar.tsx
│   └── AppBar.tsx
│
├── services/
│   ├── users.service.ts
│   └── useDebounce.ts
│
├── types/
│   └── user.ts
│
├── i18n/
│   ├── en-EN.json
│   └── it-IT.json
│
└── App.tsx
```