import { Container } from "@/components/ui/Container";

// Temporary page: stock video and sound candidates for the hero demo.
// Media is hot-linked for preview only. Delete this folder once the choice is made.

interface Candidate {
  label: string;
  note: string;
  page: string;
  src: string;
}

const video = (
  label: string,
  note: string,
  slug: string,
  file: string,
): Candidate => ({
  label,
  note,
  page: `https://www.pexels.com/video/${slug}/`,
  src: `https://videos.pexels.com/video-files/${file}`,
});

const sound = (label: string, note: string, id: number): Candidate => ({
  label,
  note,
  page: `https://mixkit.co/free-sound-effects/`,
  src: `https://assets.mixkit.co/active_storage/sfx/${id}/${id}-preview.mp3`,
});

const videoSlots: { title: string; options: Candidate[] }[] = [
  {
    title: "Видео по умолчанию (звук не выбран)",
    options: [
      video(
        "V0-A",
        "размытые огни (боке)",
        "bokeh-lights-6543215",
        "6543215/6543215-sd_960_464_30fps.mp4",
      ),
      video(
        "V0-B",
        "человек занимается при тёплом свете",
        "man-studying-in-cozy-room-under-warm-light-16835009",
        "16835009/16835009-sd_640_360_24fps.mp4",
      ),
      video(
        "V0-C",
        "заметки и ноутбук",
        "a-person-taking-notes-and-using-a-laptop-15198034",
        "15198034/15198034-sd_640_360_24fps.mp4",
      ),
    ],
  },
  {
    title: "Видео для Rain",
    options: [
      video(
        "V1-A",
        "капли на стекле",
        "droplets-of-water-over-glass-surface-4786522",
        "4786522/4786522-sd_640_360_30fps.mp4",
      ),
      video(
        "V1-B",
        "дождь на оконном стекле",
        "raindrops-on-a-window-glass-13292544",
        "13292544/13292544-sd_640_360_24fps.mp4",
      ),
    ],
  },
  {
    title: "Видео для Forest",
    options: [
      video(
        "V2-A",
        "высокие деревья, вид снизу",
        "low-angle-shot-of-tall-trees-5744473",
        "5744473/5744473-sd_640_360_24fps.mp4",
      ),
      video(
        "V2-B",
        "лес",
        "in-the-middle-of-the-hood-part-1-11986207",
        "11986207/11986207-sd_640_360_30fps.mp4",
      ),
    ],
  },
  {
    title: "Видео для Cafe",
    options: [
      video(
        "V3-A",
        "люди в кофейне",
        "people-in-a-coffee-shop-6828710",
        "6828710/6828710-sd_640_360_25fps.mp4",
      ),
      video(
        "V3-B",
        "официант обслуживает гостей",
        "waiter-attending-to-the-customers-5529327",
        "5529327/5529327-sd_640_360_30fps.mp4",
      ),
    ],
  },
];

const soundSlots: { title: string; options: Candidate[] }[] = [
  {
    title: "Звук Rain",
    options: [
      sound("S1-A", "Rain long loop, 0:57", 2394),
      sound("S1-B", "Light rain loop, 0:39", 1253),
    ],
  },
  {
    title: "Звук Forest",
    options: [
      sound("S2-A", "Forest birds ambience, 2:31", 1210),
      sound("S2-B", "River in the forest with birds, 1:35", 1216),
    ],
  },
  {
    title: "Звук Cafe",
    options: [
      sound("S3-A", "Restaurant crowd talking ambience, 2:00", 444),
      sound("S3-B", "Hotel conversation and laughter with din, 0:24", 366),
    ],
  },
];

function Caption({ option }: { option: Candidate }) {
  return (
    <a
      href={option.page}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-muted underline hover:text-foreground"
    >
      {option.label} · {option.note}
    </a>
  );
}

export default function MediaOptions() {
  return (
    <main className="py-10">
      <Container className="flex flex-col gap-10">
        {videoSlots.map((slot) => (
          <section key={slot.title} className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">{slot.title}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {slot.options.map((option) => (
                <div key={option.label} className="flex flex-col gap-2">
                  <video
                    src={option.src}
                    controls
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="aspect-video w-full rounded-card border border-border bg-surface object-cover"
                  />
                  <Caption option={option} />
                </div>
              ))}
            </div>
          </section>
        ))}

        {soundSlots.map((slot) => (
          <section key={slot.title} className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">{slot.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {slot.options.map((option) => (
                <div key={option.label} className="flex flex-col gap-2">
                  <audio
                    src={option.src}
                    controls
                    preload="none"
                    className="w-full"
                  />
                  <Caption option={option} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </Container>
    </main>
  );
}
