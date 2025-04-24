// 🔥 Tu configuración personalizada de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUoWqI746sHVXyKV7AHhFfM8EmNjyKYdQ",
  authDomain: "amerike-5dev.firebaseapp.com",
  projectId: "amerike-5dev",
  storageBucket: "amerike-5dev.firebasestorage.app",
  messagingSenderId: "903669411085",
  appId: "1:903669411085:web:18de7429aeceb45897d444",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

export { auth, db };
