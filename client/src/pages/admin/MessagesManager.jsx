import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  Mail,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import adminApi from "../../services/adminApi";

function MessagesManager() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await adminApi.get("/messages");

      if (response.data.success) {
        setMessages(response.data.data);
      }
    } catch (error) {
      console.error(
        "Failed to fetch messages:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    try {
      await adminApi.patch(`/messages/${id}/read`);

      setMessages((previous) =>
        previous.map((message) =>
          message._id === id
            ? { ...message, read: true }
            : message
        )
      );
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  };

  const deleteMessage = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      await adminApi.delete(`/messages/${id}`);

      setMessages((previous) =>
        previous.filter((message) => message._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="mb-3 flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Dashboard
            </button>

            <h1 className="text-2xl font-semibold">
              Messages
            </h1>

            <p className="mt-1 text-sm text-white/40">
              Messages received through your portfolio.
            </p>
          </div>

          <div className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/50">
            {messages.length} messages
          </div>

        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">

        {loading ? (
          <div className="py-20 text-center text-white/40">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <Mail
              size={32}
              className="mx-auto text-white/30"
            />

            <p className="mt-4 text-white/50">
              No messages yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {messages.map((message) => (
              <div
                key={message._id}
                className={`rounded-2xl border p-6 transition ${
                  message.read
                    ? "border-white/10 bg-white/[0.03]"
                    : "border-white/20 bg-white/[0.06]"
                }`}
              >

                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-lg font-semibold">
                        {message.name}
                      </h2>

                      {!message.read && (
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                          NEW
                        </span>
                      )}

                    </div>

                    <a
                      href={`mailto:${message.email}`}
                      className="mt-1 inline-block text-sm text-white/40 transition hover:text-white"
                    >
                      {message.email}
                    </a>

                    <p className="mt-5 whitespace-pre-wrap leading-7 text-white/60">
                      {message.message}
                    </p>

                    <p className="mt-5 text-xs text-white/30">
                      {new Date(message.createdAt).toLocaleString()}
                    </p>

                  </div>

                  <div className="flex shrink-0 gap-2">

                    {!message.read && (
                      <button
                        onClick={() => markAsRead(message._id)}
                        title="Mark as read"
                        className="rounded-full border border-white/10 p-3 text-white/50 transition hover:border-white/30 hover:text-white"
                      >
                        <Check size={17} />
                      </button>
                    )}

                    <a
                      href={`mailto:${message.email}`}
                      title="Reply"
                      className="rounded-full border border-white/10 p-3 text-white/50 transition hover:border-white/30 hover:text-white"
                    >
                      <Mail size={17} />
                    </a>

                    <button
                      onClick={() => deleteMessage(message._id)}
                      title="Delete"
                      className="rounded-full border border-white/10 p-3 text-white/50 transition hover:border-red-400/40 hover:text-red-400"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default MessagesManager;