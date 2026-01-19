import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn/ExploreBtn";
import { IEvent } from "@/database/event.model";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {
  "use cache";
  cacheLife("hours");
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();
  return (
    <section>
      <h1 className="text-center">
        The hub for Every Dev <br /> & Tech Enthusiast
      </h1>
      <p className="text-center mt-5">
        Discover, join, and experience the best events happening around you.
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <EventCard key={event.title} {...event} />
            ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
