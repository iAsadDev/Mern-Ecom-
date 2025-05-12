const [password, setPassword] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();
  const res = await fetch("http://localhost:5000/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("adminToken", data.token);
    setAdminAuth(true);
    navigate('/admin');
  } else {
    alert("Unauthorized");
  }
};
