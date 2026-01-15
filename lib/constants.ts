export type Event = {
  title: string;
  image: string;
  description: string;
  date: string;
  time: string;
  slug: string;
  location: string;
};

export const events: Event[] = [
  {
    title: "React Universe Conf 2026",
    image: "/images/event1.png",
    description:
      "The biggest React conference in the universe. Join us for a week of learning and networking.",
    date: "Aug 15, 2026",
    time: "09:00 AM",
    slug: "react-universe-conf-2026",
    location: "San Francisco, CA",
  },
  {
    title: "Next.js Conf 2026",
    image: "/images/event2.png",
    description:
      "Come meet the team behind Next.js and learn about the new features.",
    date: "Oct 24, 2026",
    time: "10:00 AM",
    slug: "nextjs-conf-2026",
    location: "San Francisco, CA",
  },
  {
    title: "AI Engineer Summit",
    image: "/images/event3.png",
    description:
      "The world's largest conference for AI engineers. Learn from the best in the industry based on.",
    date: "Nov 12, 2026",
    time: "11:00 AM",
    slug: "ai-engineer-summit",
    location: "San Francisco, CA",
  },
  {
    title: "TechCrunch Disrupt 2026",
    image: "/images/event4.png",
    description:
      "The world's leading authority on debuting revolutionary startups.",
    date: "Sep 18, 2026",
    time: "09:00 AM",
    slug: "techcrunch-disrupt-2026",
    location: "San Francisco, CA",
  },
  {
    title: "CES 2027",
    image: "/images/event5.png",
    description:
      "CES® is the most influential tech event in the world — the proving ground for breakthrough technologies.",
    date: "Jan 05, 2027",
    time: "09:00 AM",
    slug: "ces-2027",
    location: "Las Vegas, NV",
  },
  {
    title: "SXSW 2027",
    image: "/images/event6.png",
    description:
      "South by Southwest® dedicates itself to helping creative people achieve their goals.",
    date: "Mar 12, 2027",
    time: "09:00 AM",
    slug: "sxsw-2027",
    location: "Austin, TX",
  },
];
