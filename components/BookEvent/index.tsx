"use client";
import { createBooking } from "@/lib/actions/booking.actions";
import { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { success } = await createBooking({
      eventId,
      slug,
      email,
    });
    if (!success) {
      console.error("Failed to create booking");
      return;
    }
    if (success) {
      setSubmitted(true);
    }
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
