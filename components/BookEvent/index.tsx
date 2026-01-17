"use client";
import { useState } from "react";

const BookEvent = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };
  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for booking the event!</p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit" className="button-submit">
              Book Event
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
