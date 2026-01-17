import Image from "next/image";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailsItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <section className="agenda">
    <h2>Event Agenda</h2>
    <ul>
      {agendaItems.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </section>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map(tag => (
      <div key={tag} className="pill">
        {tag}
      </div>
    ))}
  </div>
);

const EventDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {
    event: {
      title,
      description,
      overview,
      image,
      venue,
      location,
      date,
      time,
      mode,
      audience,
      agenda,
      organizer,
      tags,
    },
  } = await request.json();

  if (!title || !description) return notFound();
  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>
      <div className="details">
        <div className="content">
          <Image
            src={image}
            alt={title}
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailsItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />
            <EventDetailsItem
              icon="/icons/clock.svg"
              alt="clock"
              label={time}
            />
            <EventDetailsItem
              icon="/icons/pin.svg"
              alt="pin"
              label={location}
            />
            <EventDetailsItem icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetailsItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>
          <EventAgenda agendaItems={JSON.parse(agenda)} />
          <section className="flex-col-gap-2">
            <h2>Event Organizer</h2>
            <p>{organizer}</p>first
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Tags</h2>

            <EventTags tags={JSON.parse(tags)} />
          </section>
        </div>
        <aside className="booking">
          <p className="text-lg font-semibold">Book your ticket now</p>
          <button>Book Now</button>
        </aside>
      </div>
    </section>
  );
};

export default EventDetails;
