import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setError(false);

    try {
      const res = await fetch("http://localhost:5000/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setStatus(data.message);
      setError(res.status !== 200);

      // 👇 Reset form if successful
      if (res.status === 200) {
        setForm({ name: "", email: "", message: "" });
      }
    } catch (err) {
      setStatus("Failed to send. Please try again.");
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side - image or gradient */}
          <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8">
            <h2 className="text-3xl font-bold">Let’s Talk</h2>
            <p className="mt-2 text-sm opacity-80">We'd love to hear from you</p>
          </div>

          {/* Right side - form */}
          <form onSubmit={handleSubmit} className="space-y-6 p-8">
            <h2 className="text-2xl font-semibold text-gray-700">Contact Us</h2>

            <div className="relative">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="peer w-full border-b-2 border-gray-300 bg-transparent px-10 py-3 text-sm outline-none transition-all  mt-3 focus:border-blue-500"
                placeholder=" "
              />
              <User className="absolute left-2 top-3 text-gray-400" size={20} />
              <label className="absolute left-10  text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500">
                Your Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="peer w-full border-b-2 border-gray-300 bg-transparent px-10 mt-3 py-3 text-sm outline-none transition-all focus:border-blue-500"
                placeholder=" "
              />
              <Mail className="absolute left-2 top-3 text-gray-400" size={20} />
              <label className="absolute left-10 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500">
                Your Email
              </label>
            </div>

            <div className="relative">
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
                className="peer w-full resize-none border-b-2 border-gray-300 bg-transparent  mt-3 px-10 py-3 text-sm outline-none transition-all focus:border-blue-500"
                placeholder=" "
              />
              <MessageSquare className="absolute left-2 top-3 text-gray-400" size={20} />
              <label className="absolute left-10 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500">
                Your Message
              </label>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-white font-medium transition hover:shadow-xl hover:brightness-110"
            >
              Send Message
            </motion.button>

            {status && (
              <p
                className={`text-center text-sm ${
                  error ? "text-red-500" : "text-green-600"
                }`}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}
