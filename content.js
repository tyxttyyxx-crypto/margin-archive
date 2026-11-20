/**
 * EDIT YOUR WEBSITE HERE.
 * Replace the sample photos in assets/photographs and change the entries below.
 * No frameworks, accounts, or build tools required.
 * Dates use YYYY-MM-DD. Images use paths relative to index.html.
 */
window.SITE_CONTENT = {
  settings: {
    siteName: "margin.",
    ownerName: "your name",
    subtitle: "a personal archive",
    tagline: "A practice of noticing.",
    introduction: "Photographs, unfinished thoughts, and the small things I want to keep. An evolving collection rather than a finished statement.",
    about: "This is a place for work in progress, for looking closely, and for returning to ideas as they change. No fixed subject. No required conclusion.",
    email: "", // Optional: add your email to display a contact link.
    instagram: "" // Optional: full https:// URL.
  },

  photography: [
    { id: "fading-distance", title: "Fading distance", category: "landscape", year: "2026", image: "assets/photographs/01.jpg", description: "A study of layered distance and the way a horizon dissolves.", alt: "Abstract layered earth-toned landscape", sample: true },
    { id: "afternoon-geometry", title: "Afternoon geometry", category: "architecture", year: "2026", image: "assets/photographs/02.jpg", description: "Somewhere between a room, a shadow, and a remembered shape.", alt: "Warm geometric sunlit planes and shadows", sample: true },
    { id: "soft-focus", title: "Soft focus", category: "texture", year: "2026", image: "assets/photographs/03.jpg", description: "An attempt to describe a familiar color without naming it.", alt: "Soft green abstract light and blurred forms", sample: true },
    { id: "after-the-tide", title: "After the tide", category: "landscape", year: "2026", image: "assets/photographs/04.jpg", description: "The horizon as a line that refuses to stay still.", alt: "Cool gray ocean and distant horizon", sample: true },
    { id: "the-opening", title: "The opening", category: "architecture", year: "2026", image: "assets/photographs/05.jpg", description: "Light makes its own architecture.", alt: "Dark architectural geometric shapes divided by a sliver of light", sample: true },
    { id: "almost-night", title: "Almost night", category: "texture", year: "2026", image: "assets/photographs/06.jpg", description: "Small points of light at the edge of recognition.", alt: "Deep-blue dusk with soft amber and pale blue lights", sample: true }
  ],

  journals: [
    {
      id: "the-act-of-noticing", title: "The act of noticing", date: "2026-11-09", category: "reflections", excerpt: "Perhaps attention is not just the way we look at the world. Perhaps it is also the way we decide what deserves to remain.", sample: true,
      blocks: [
        { type: "p", text: "I keep returning to the small moments that seem too ordinary to save. The patch of light on a wall. A sentence that stayed with me long after the conversation ended. The accidental symmetry of two strangers standing at a crossing." },
        { type: "p", text: "Photography makes the act of choosing visible. The frame includes something, and in doing so excludes everything else. Writing feels similar, except the edges of the frame are harder to find." },
        { type: "quote", text: "To pay attention is to make a small, temporary claim: this matters." },
        { type: "p", text: "This website is one place to keep those claims. Not because each deserves permanence, but because I want to notice what changes when I revisit them." }
      ]
    },
    {
      id: "notes-on-uncertainty", title: "Notes on uncertainty", date: "2026-10-22", category: "fragments", excerpt: "Not every question is waiting for an answer. Some become more interesting when they stay open.", sample: true,
      blocks: [
        { type: "p", text: "I used to think an unfinished thought was an unsuccessful one. It is an efficient illusion: give every idea a conclusion and the world begins to look manageable." },
        { type: "p", text: "But some questions change under observation. Their meaning depends on when I ask them, and what I have already decided to notice." },
        { type: "p", text: "So I am leaving a few doors open. I can always close them later." }
      ]
    },
    {
      id: "a-place-to-return", title: "A place to return", date: "2026-09-17", category: "field notes", excerpt: "An archive does not have to be a monument. It can be a living record of changing interests.", sample: true,
      blocks: [
        { type: "p", text: "There is something comforting about keeping evidence of earlier selves, including the ones that were wrong, impatient, or convinced of things I no longer believe." },
        { type: "p", text: "I want an archive that leaves enough space for revision. A garden rather than a museum: the old material is still there, but something new can grow beside it." }
      ]
    }
  ],

  garden: [
    { id: "attention", title: "Attention as a form of care", category: "perception", status: "growing", date: "2026-11-12", excerpt: "What changes when we treat attention as an action, not a trait?", body: "Attention isn't only a resource that gets allocated. It is a form of selection. What we repeatedly notice can change what feels important.", links: ["framing", "memory"], sample: true, x: 20, y: 28 },
    { id: "framing", title: "The edges of a frame", category: "photography", status: "seed", date: "2026-11-06", excerpt: "Every image quietly insists on the existence of an outside.", body: "A photograph is partly a record of exclusion: the background, the moment before, the moment after. The image doesn't show these, but it depends on them.", links: ["attention", "negative-space"], sample: true, x: 53, y: 17 },
    { id: "memory", title: "Memory is an editor", category: "perception", status: "growing", date: "2026-10-30", excerpt: "Remembering is reconstruction, not simple retrieval.", body: "Each return to a memory may subtly change its shape. What does it mean to make an archive of something inherently revisable?", links: ["attention", "unfinished"], sample: true, x: 78, y: 39 },
    { id: "negative-space", title: "Negative space", category: "photography", status: "kept", date: "2026-10-18", excerpt: "What is absent can organize what remains.", body: "In visual composition, empty space isn't empty in function. Silence in conversation may work in a similar way.", links: ["framing", "ordinary"], sample: true, x: 36, y: 53 },
    { id: "unfinished", title: "On unfinished things", category: "process", status: "seed", date: "2026-10-03", excerpt: "A note can be useful before it knows what it wants to become.", body: "A garden note can begin as a phrase, accumulate examples, split into multiple questions, or remain stubbornly small. Completion is optional.", links: ["memory", "revision"], sample: true, x: 66, y: 74 },
    { id: "ordinary", title: "The ordinary is not neutral", category: "perception", status: "seed", date: "2026-09-28", excerpt: "Why do some ordinary details become worth keeping?", body: "Habit makes most details disappear. Novelty is one way to interrupt that disappearance, but deliberate attention is another.", links: ["negative-space", "attention"], sample: true, x: 12, y: 76 },
    { id: "revision", title: "Revision without erasure", category: "process", status: "growing", date: "2026-09-14", excerpt: "Changing your mind doesn't have to remove the older version.", body: "Keeping earlier drafts can reveal the movement of an idea. Sometimes the history of a thought is more illuminating than its latest form.", links: ["unfinished", "memory"], sample: true, x: 88, y: 83 }
  ]
};
