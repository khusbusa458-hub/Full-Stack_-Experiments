# Post Composer Mini-Project Setup Guide (Linux)

This guide provides step-by-step instructions to set up and run the **Post Composer** application on **Linux** (Ubuntu, Debian, Fedora, Arch Linux, etc.). The project consists of a **Spring Boot backend** (with an in-memory H2 database) and a **React (Vite) frontend**.

---

## Prerequisites

Before starting, ensure that your Linux system has the required software installed.

### 1. Java Development Kit (JDK 17 or JDK 21)

Verify if Java is installed:
```bash
java -version
```

If not installed, install OpenJDK via your package manager:

- **Ubuntu / Debian / Mint:**
  ```bash
  sudo apt update
  sudo apt install -y openjdk-21-jdk
  ```
- **Fedora / RHEL:**
  ```bash
  sudo dnf install -y java-21-openjdk-devel
  ```
- **Arch Linux:**
  ```bash
  sudo pacman -S jdk21-openjdk
  ```

---

### 2. Node.js & npm (Node v18+ recommended)

Verify if Node.js and npm are installed:
```bash
node -v
npm -v
```

If not installed, install via your package manager or NodeSource:

- **Ubuntu / Debian (via NodeSource):**
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs
  ```
- **Ubuntu / Debian (Default repositories):**
  ```bash
  sudo apt update
  sudo apt install -y nodejs npm
  ```
- **Fedora:**
  ```bash
  sudo dnf install -y nodejs npm
  ```
- **Arch Linux:**
  ```bash
  sudo pacman -S nodejs npm
  ```

---

## 1. Running the Backend (Spring Boot)

The backend runs on Spring Boot and uses an in-memory H2 database, requiring no external database installation.

1. Open your Linux terminal.
2. Navigate to the `backend` directory:
   ```bash
   cd Experiment-5/backend
   ```
3. Grant executable permission to the Gradle wrapper script (if not already set):
   ```bash
   chmod +x gradlew
   ```
4. Start the backend application:
   ```bash
   ./gradlew bootRun
   ```
5. The backend server will start at `http://localhost:8080`.
   - Keep this terminal window open.

---

## 2. Running the Frontend (React + Vite)

1. Open a **new terminal tab or window** (keep the backend terminal running).
2. Navigate to the `frontend` directory:
   ```bash
   cd Experiment-5/frontend
   ```
3. Install the project dependencies (required on first run):
   ```bash
   npm install
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. The frontend application will start at `http://localhost:5173`.
6. Open your web browser (e.g., Firefox, Chrome) and visit:
   ```
   http://localhost:5173
   ```

---

## Testing the Application

Once both the backend and frontend are running:
1. Open `http://localhost:5173` in your browser.
2. Select a target social media platform (**Twitter**, **Instagram**, or **Facebook**).
3. Type your post in the text area and observe the real-time word counter.
4. If the word limit for the selected platform is exceeded, a global error banner is displayed.
5. Click **Post** to save your entry. The saved post will appear in the **Recent Posts** section, where you can edit or delete it.

---

## Linux Troubleshooting & Useful Commands

- **Permission Denied on `./gradlew`**:
  Run `chmod +x gradlew` to add execution permissions.

- **Port Already in Use (`8080` or `5173`)**:
  Check which process is using the port and terminate it:
  ```bash
  # Check process on port 8080
  sudo lsof -i :8080
  # Kill process by PID
  kill -9 <PID>

  # Check process on port 5173
  sudo lsof -i :5173
  # Kill process by PID
  kill -9 <PID>
  ```

- **Set Default Java Version**:
  If multiple Java versions are installed, set the active version using:
  ```bash
  sudo update-alternatives --config java
  ```

- **Clean and Rebuild Backend**:
  If you run into build caching issues:
  ```bash
  ./gradlew clean bootRun
  ```

- **Clear Node Dependencies**:
  If npm throws dependency conflicts:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
