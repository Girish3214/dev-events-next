import { Event } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

const EventCard = ({
  title,
  image,
  description,
  date,
  time,
  slug,
  location,
}: Event) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image
        src={image}
        alt={title}
        className="poster"
        width={410}
        height={300}
      />
      <div className="flex flex-row gap-2">
        <Image src={"./icons/pin.svg"} alt="pin" width={14} height={14} />
        <p>{location}</p>
      </div>
      <div className="title">{title}</div>

      <div className="datetime">
        <div>
          <Image
            src="/icons/calendar.svg"
            alt="calendar"
            width={14}
            height={14}
          />
          <p>{date}</p>
        </div>
        <div>
          <Image src="/icons/clock.svg" alt="clock" width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
