// All site content lives here. Edit this file, run `node build.mjs`, deploy.
// Band-written copy (bio, credits, press quotes, video notes) is reproduced verbatim from the old Wix site
// and from Bandcamp. Do not reword it here; layout lives in build.mjs and css/style.css.

export const site = {
  name: 'The Deafening Colors',
  short: 'TDC',
  url: 'https://thedeafeningcolors.com',
  email: 'thedeafeningcolors@gmail.com',
  description:
    'The Deafening Colors are a rock band from New Jersey. Albums Run Pass Option, Carousel Season, and Upstairs are on Bandcamp, Spotify, and Apple Music. New music is on the way.',
  foundedYear: 2009,
};

// Bandcamp first, everywhere. It carries far more plays than the streaming services.
export const links = {
  bandcamp: 'https://thedeafeningcolors.bandcamp.com',
  spotify: 'https://open.spotify.com/artist/46PyW6iCYaZPO5Ua83ibKf',
  apple: 'https://music.apple.com/us/artist/the-deafening-colors/1014127763',
  youtube: 'https://www.youtube.com/@DeafeningColors',
  instagram: 'https://www.instagram.com/thedeafeningcolors/',
  facebook: 'https://www.facebook.com/deafeningcolors',
  x: 'https://x.com/deafeningcolors',
  soundcloud: 'https://soundcloud.com/thedeafeningcolors-1',
  fma: 'https://freemusicarchive.org/music/The_Deafening_Colors/Live_on_WFMUs_Surface_Noise_with_Joe_McGasko_1252016/',
};

// The icon row in the header and footer, in display order.
export const iconRow = [
  { key: 'bandcamp', label: 'Bandcamp', icon: 'bandcamp' },
  { key: 'spotify', label: 'Spotify', icon: 'spotify' },
  { key: 'apple', label: 'Apple Music', icon: 'applemusic' },
  { key: 'youtube', label: 'YouTube', icon: 'youtube' },
  { key: 'instagram', label: 'Instagram', icon: 'instagram' },
  { key: 'facebook', label: 'Facebook', icon: 'facebook' },
  { key: 'x', label: 'X', icon: 'x' },
];

// Home page hero. PLACEHOLDER COPY (2026-09-04): Cris to confirm wording once the new release has a name and date.
export const announcement = {
  eyebrow: 'New Music',
  title: 'New Music Is on the Way',
  body:
    'The Deafening Colors are back in the studio. The next record is coming, and Bandcamp followers hear it first.',
  primary: { label: 'Follow on Bandcamp', href: links.bandcamp },
  secondary: { label: 'Join the Mailing List', href: '/contact/#list' },
};

// Slug of the release featured on the home page as "Latest Release".
export const featuredRelease = 'run-pass-option';

export const releases = [
  {
    slug: 'run-pass-option',
    title: 'Run Pass Option',
    kind: 'Album',
    date: '2019-01-29',
    year: 2019,
    cover: '/img/covers/run-pass-option.jpg',
    coverLarge: '/img/covers/run-pass-option-1200.jpg',
    bandcamp: { type: 'album', id: 2868823543, url: 'https://thedeafeningcolors.bandcamp.com/album/run-pass-option' },
    spotify: 'https://open.spotify.com/artist/46PyW6iCYaZPO5Ua83ibKf',
    apple: 'https://music.apple.com/us/album/run-pass-option-ep/1449477683',
    tracks: [
      ['Saracen Revisited', '2:41'],
      ['Count on a Crime', '2:34'],
      ['Riggins in the Bardo', '3:04'],
      ['Crash Course', '2:40'],
      ['Love on Television (2016 Version)', '2:28'],
      ['She Moved to Oklahoma', '4:25'],
    ],
    // Verbatim from Bandcamp.
    about: '"Run Pass Option" is our third album. It follows 2015\'s "Carousel Season" and 2012\'s "Upstairs."',
    credits: [
      'All songs on "Run Pass Option" were written and performed by John Paul Arthur and Cristofer Slotoroff.',
      'Recorded, mixed, and mastered by Cris in a basement in Linwood, NJ, two different basements in Weehawken, NJ, and a bedroom in New York City, NY.',
    ],
    personnel: ['John Paul Arthur - Guitar, Bass, Vocals', 'Cristofer Slotoroff - Guitar, Bass, Keyboards, Drums'],
  },
  {
    slug: 'live-at-wfmu',
    title: 'Live at WFMU EP',
    kind: 'Live EP',
    date: '2016-02-22',
    year: 2016,
    cover: '/img/covers/live-at-wfmu.jpg',
    free: true,
    fma: links.fma,
    tracks: [
      ['Mary-Anne'],
      ["Diving Horse's Ghost"],
      ['Waiting For The Axe'],
      ['City By The Sea'],
      ['Parkway South'],
      ['Jerry Ryan'],
    ],
    // Verbatim from the old site's Music page.
    credits: [
      'Released February 2016 on The Free Music Archive [remains available for free download or stream]',
      "Recorded Live at WFMU's Studio in Jersey City, NJ on 1-18-16 on Surface Noise with host Joe McGasko",
      'Air Date: 1-25-16 on 91.1FM WFMU',
      'Engineer: Matt Marando',
    ],
    personnel: [
      'John Paul Arthur - Rhythm Guitar, Lead Vocals',
      'Gerard Canonico - Drums, Backing Vocals',
      'Cris Slotoroff - Lead Guitar, Backing Vocals',
      'Mikey Winslow - Bass Guitar, Backing Vocals',
    ],
  },
  {
    slug: 'carousel-season',
    title: 'Carousel Season',
    kind: 'Album',
    date: '2015-07-21',
    year: 2015,
    cover: '/img/covers/carousel-season.jpg',
    coverLarge: '/img/covers/carousel-season-1200.jpg',
    bandcamp: { type: 'album', id: 3899803341, url: 'https://thedeafeningcolors.bandcamp.com/album/carousel-season' },
    spotify: 'https://open.spotify.com/artist/46PyW6iCYaZPO5Ua83ibKf',
    apple: 'https://music.apple.com/us/album/carousel-season/1014127752',
    soundcloud: 'https://soundcloud.com/thedeafeningcolors-1/sets/carousel-season',
    tracks: [
      ['Parkway South', '3:33'],
      ['Mary-Anne', '3:42'],
      ["Diving Horse's Ghost", '3:10'],
      ['Waiting for the Axe', '3:39'],
      ['City by the Sea', '2:37'],
      ['Jerry Ryan', '3:10'],
      ["I'm Waiting", '0:34'],
      ['Past Time', '5:29'],
      ['Sand Stuck in Sheets', '1:35'],
      ['Carousel Season', '4:12'],
    ],
    about:
      'Carousel Season is the second full-length album from The Deafening Colors. It was written and recorded with a focus on the places John and Cris grew up - Atlantic City / Ocean City, New Jersey and the surrounding area.',
    credits: [
      "Recorded in Cris's Bedroom in Weehawken, New Jersey",
      'Special Thanks to Patrick Schridde. He took the picture we have used as our album cover, and his photography in general is pretty incredible. Go check him out on flickr as "goodbyetrouble". Seriously, he\'s REALLY good.',
    ],
    personnel: ['John Paul Arthur - Vocals', 'Cristofer Slotoroff - Instruments'],
  },
  {
    slug: 'upstairs',
    title: 'Upstairs',
    kind: 'Album',
    date: '2012-03-20',
    year: 2012,
    cover: '/img/covers/upstairs.jpg',
    coverLarge: '/img/covers/upstairs-1200.jpg',
    bandcamp: { type: 'album', id: 2847565290, url: 'https://thedeafeningcolors.bandcamp.com/album/upstairs' },
    tracks: [
      ['Bugs Wearing Masks', '1:31'],
      ['None of the Other Ones Will Do', '3:22'],
      ['Island Full of Christians', '2:41'],
      ["Sun's Out, You're Still Falling Out of...", '4:18'],
      ['Perhaps Summers Do End; The Wind Blows for Now', '1:44'],
      ['Sun and Sand', '3:57'],
      ['Tettigoniidae', '0:53'],
      ['Out of My Head', '3:37'],
      ['Hunterdon Hills', '0:52'],
      ['Sunday, Spent in Solitude', '5:18'],
      ['Slow Burn', '4:09'],
      ['Late August in Morristown, 2AM, 85 Degrees', '2:20'],
      ['Salt Free Diet', '5:00'],
      ['Home for the Holidays', '4:09'],
      ['My Favorite Hill', '4:46'],
      ["That's How You Will Know...", '5:09'],
      ["I don't want...", '1:36'],
      ['The Front Porch', '2:40'],
      ["The Creaky Steps of Wisteria Terrace Interrupt Mark's Afternoon", '0:29'],
      ['Sounds Like Boredom', '4:47'],
      ['The Other World', '4:14'],
      ['Nothing is Up', '2:34'],
    ],
    about:
      'Recorded Spring 2011-Spring 2012 in various apartments and basements in and around Morristown, Hoboken, and Atlantic City.',
    credits: [
      'Thank you thank you thank you all who listened, came to a show, lent us your gear, offered your advice, or had us crash on your floor. Hopefully, this is the first of many to come.',
      'Love, Cris',
      '3/20/12',
      '** Special thanks to: All members of Deep Sleeper and Jerry Ryan - you guys made such an impression on all of us. This wouldn\'t have happened without you.',
    ],
    personnel: [
      'Marx Lenin Angelito - Drums/Percussion/Musicianship',
      'John Paul Arthur - Vocals/Guitars',
      'Mark Macor - Guitars',
      'Cris Slotoroff - Guitars/Bass/Backgr. Vocals/Mixing',
    ],
  },
];

export const singles = [
  {
    slug: 'she-moved-to-oklahoma',
    title: 'She Moved to Oklahoma',
    date: '2018-07-27',
    year: 2018,
    cover: '/img/covers/she-moved-to-oklahoma.jpg',
    bandcamp: { type: 'track', id: 2101262907, url: 'https://thedeafeningcolors.bandcamp.com/track/she-moved-to-oklahoma' },
    note: 'Advance single from Run Pass Option.',
  },
  {
    slug: 'none-of-the-other-ones-will-do',
    title: 'None of the Other Ones Will Do',
    date: '2017-03-07',
    year: 2017,
    cover: '/img/covers/none-of-the-other-ones-will-do.jpg',
    bandcamp: { type: 'track', id: 2301252402, url: 'https://thedeafeningcolors.bandcamp.com/track/none-of-the-other-ones-will-do' },
    note: 'Free download.',
  },
  {
    slug: 'island-full-of-christians',
    title: 'Island Full of Christians',
    date: '2017-03-07',
    year: 2017,
    cover: '/img/covers/island-full-of-christians.jpg',
    bandcamp: { type: 'track', id: 3857252366, url: 'https://thedeafeningcolors.bandcamp.com/track/island-full-of-christians-3' },
    note: 'Re-recorded for the five-year anniversary of Upstairs. Free download.',
  },
];

// Shows. Add upcoming dates here; the Shows page shows an empty state when this list is empty.
// Each: { date: 'YYYY-MM-DD', venue, city, time, with, tickets (url), note }
export const shows = {
  upcoming: [],
  past: [
    { date: '2016-10-21', venue: 'The Delancey', city: 'New York, NY', with: 'Terra and the Dactyls, One Day Steady, The Manimals', poster: '/img/poster-delancey-2016.jpg' },
    { date: '2016-07-13', venue: "Arlene's Grocery", city: 'New York, NY', with: 'The Danbees', poster: '/img/poster-arlenes-2016.jpg' },
    { date: '2016-01-30', venue: 'The Bowery Electric', city: 'New York, NY' },
    { date: '2016-01-18', venue: "WFMU 91.1 FM, Surface Noise with Joe McGasko", city: 'Jersey City, NJ', note: 'Live in-studio session. Aired 1-25-16.' },
  ],
};

// Press quotes, verbatim from the old site.
export const press = [
  {
    album: 'Run Pass Option',
    quotes: [
      {
        text:
          'Contenders for the most memorable tracks in the set go to the snappy indie pop of “Crash Course” with a deft mix of power pop feel and massive, reverb-drenched guitars verging close to shoegaze territory, but managing to stay in its lane; and the album’s first single, “She Moved to Oklahoma.” You’ll hear all kinds of touchpoints with this track with a latter half shifting tempos and moods.',
        who: 'DW Dunphy',
        outlet: 'Musictap.com',
        url: 'http://www.musictap.com/2019/01/29/album-review-the-deafening-colors-run-pass-option/',
      },
    ],
  },
  {
    album: 'Carousel Season',
    quotes: [
      {
        text: 'Local four-piece The Deafening Colors recently released their second album, Carousel Season, an album that brims over with beautiful and poignant pop music.',
        who: 'WFMU 91.1 FM, Jersey City, NJ',
        url: 'http://www.wfmu.org/playlists/shows/64773',
        linkLabel: 'live set on playlist',
        featured: true,
      },
      {
        text: 'These songs and the rest of Carousel Season sound like the endless summers of youth, all timeless harmonies and great surf and noise guitar, which spin around in your head long after the album ends.',
        who: 'Paul Gleason',
        outlet: 'Stereo Embers Magazine',
        url: 'http://stereoembersmagazine.com/scouting-report-the-deafening-colors/',
      },
      {
        text: 'Though created in Weehawken, it touches on the economic rise and fall of Atlantic City, joy and heartbreak on the beaches of the Jersey Shore, and what happens when you leave your home for many years only to come back and see it with a new set of eyes, it explores emotions that could be felt anywhere. It transcends the borders of New Jersey and tackles universal themes. This is quite a remarkable achievement.',
        who: 'Ed Magdziak',
        outlet: "You Don't Know Jersey",
        url: 'http://www.youdontknowjersey.com/2015/07/the-deafening-colors/',
      },
      {
        text: "Incredibly impressive for something that was recorded in a bedroom. Guerilla Press describes The Deafening Colors as, 'the bastard sons of Beach Boys, Best Coast, and The Jesus and Mary Chain.' Is there anything more inviting? [...] Most tracks focus on where the members grew up, which is Atlantic City / Ocean City, New Jersey. However, it takes me back to more relaxing and youthful summers on Cali shores.",
        who: 'KVRX 91.7 (University of Texas at Austin)',
        url: 'http://www.kvrx.org/reviews/carousel-season',
        linkLabel: 'Album Review',
      },
      {
        text: "Billed as \" 'The Sound of the Shore,' [...] Bruce Springsteen is forever linked with Asbury Park. When you think of Bob Dylan, you think of Greenwich Village. The Deafening Colors want to be similarly linked with southern New Jersey.",
        who: 'Vincent Jackson',
        outlet: 'The Press of Atlantic City',
        bare: true,
      },
      {
        text: "You won't believe two people recorded this record in a bedroom [...] when you hear the kaleidoscopic layers of instrumentation and gorgeous harmonies they've been able to capture on a home recording. Even more impressively, Carousel Season is a concept album about the Jersey shore, and the songwriting even surpasses the mind-blowing arrangements with its mix of whimsy, nostalgia, melancholy and joy.",
        who: 'Jim Testa',
        outlet: 'Jersey Beat',
        url: 'http://www.jerseybeat.com/editorsdesk.html',
      },
      {
        text: 'The Deafening Colors have staked their claim on summertime with “Carousel Season.” The title track from a forthcoming album is a revelation, especially to fans who have followed the group since their psyche-edged garage roots days. Immediately transporting, the song sounds and feels like a whiplash back to 1966, down the Jersey shore when we still had carousels off the boardwalks.',
        outlet: 'Pop Dose',
        url: 'http://popdose.com/listening-booth-k-adem-the-deafening-colors/',
      },
      {
        text: 'Carousel Season comes to you from those idyllic summers of the past -- the ones you remember whether you actually experienced them or not. [...] Reverb, delay, rumbling drums, and surf-inspired guitars on tracks like "Parkway South" and "Mary-Anne." Dream pop -- swirling, noisy, and shoegazy on "Waiting for the Axe" or lackadaisical and lazy on "Past Time." The retro sounds and "sha la las" of the title track. Images of sunscreen melting in eyes, skee ball, and Atlantic City throughout the record. Carousel Season is warm, romantic, and pining. It\'s a record that you can pipe through your headphones as you lounge under an umbrella on the beach or one that you can listen to -- in front of the fireplace, snow falling outside -- whenever you want to go back there.',
        outlet: 'CoolDad Music',
        url: 'http://www.cooldadmusic.com/2015/08/staycation-roundup-with-little-dickman.html',
      },
    ],
  },
];

// YouTube. Notes are verbatim from the old Video page.
export const videos = [
  {
    id: 'OiOUSXge-f0',
    title: '"Parkway South"',
    sub: 'Official Music Video',
    notes: ['Directed by: DavidWL', 'David was the overall winner of our worldwide original music video contest. Thank you David, and congrats!'],
  },
  {
    id: 'eeej9vwZQWs',
    title: '"Mary-Anne"',
    sub: 'Official Music Video',
    notes: ['Directed by: Erin Harrington', 'Erin was the winner of the best video for "Mary-Anne" in our worldwide original music video contest. Thank you Erin, and congrats!'],
  },
  {
    id: 'dxCSihQLi0U',
    title: '"None of the Other Ones Will Do"',
    sub: 'Live at The Bowery Electric, NYC 1-30-16',
    notes: [],
  },
  {
    id: 'pi7l2uo0hUc',
    title: '"Carousel Season"',
    sub: 'Live at The Bowery Electric, NYC 1-30-16',
    notes: [],
  },
];

// Bio, verbatim from the old About page (links kept as markdown).
export const about = [
  'The Deafening Colors is a rock band founded in New Jersey, and based in New Jersey and New York City.',
  "The band's latest album, [RUN PASS OPTION,](https://thedeafeningcolors.bandcamp.com/) was released on January 29th, 2019. It is available for listening, for streaming, and for download on [Bandcamp](https://thedeafeningcolors.bandcamp.com), [Spotify](https://open.spotify.com/artist/46PyW6iCYaZPO5Ua83ibKf), [Apple Music](https://music.apple.com/us/album/run-pass-option-ep/1449477683), [iTunes](https://music.apple.com/us/album/run-pass-option-ep/1449477683), and plenty of other sites.",
  'On recorded albums, the band consists of multi-instrumentalists John Paul Arthur and Cristofer Slotoroff, who started recording music together around 2001 when both were high school students near Atlantic City, NJ. Since then, they have recorded under various aliases until "The Deafening Colors" stuck in 2009.',
  'For live shows, multi-instrumentalists Gerard Canonico and Mikey Winslow joined Arthur and Slotoroff in November, 2015.',
  'TDC released their debut album, [Upstairs](https://thedeafeningcolors.bandcamp.com/album/upstairs), in early 2012. Recorded mostly during the summer of 2011, [Upstairs](https://thedeafeningcolors.bandcamp.com/album/upstairs) was conceived as a triple LP and distributed digitally via Bandcamp. It spans 23 tracks, 75 minutes, several genres, and still more moods.',
  "John and Cris recorded The Deafening Colors's second full-length album, [Carousel Season](https://thedeafeningcolors.bandcamp.com/album/carousel-season), from March-June 2015 at what was Cris's apartment in Weehawken, NJ.",
  'Written with a focus on the Jersey Shore towns where John and Cris grew up, it was released on July 21st, 2015 and is available on Spotify, iTunes, Bandcamp, and elsewhere.',
  "[Carousel Season](https://thedeafeningcolors.bandcamp.com/album/carousel-season) was well-received with critics drawing comparisons in reviews and interviews to a range of artists, from the '60s pop of the Beach Boys and The Zombies, the sincerity of Bruce Springsteen and The Smiths, all the way up to the melodic noise of Yo La Tengo, Sebadoh, and My Bloody Valentine.",
  'The band became a four-piece in November of 2015, as Mikey Winslow and Gerard Canonico joined on bass/vocals and drums/vocals, respectively. Both Mikey and Gerard are accomplished actors and musicians, having appeared in several Broadway shows (and several other bands) between them.',
  "[RUN PASS OPTION](https://thedeafeningcolors.bandcamp.com/) was released on January 29th, 2019 via Bandcamp, Spotify, Apple Music, and iTunes. The record's six songs touch on, among other concepts, Americana, nostalgia, motorcycles, television, George Saunders, love, death, and high school football... sometimes, these references take place within the course of the same song.",
];

// Bandcamp sidebar quote, verbatim.
export const bandcampQuote = {
  text: "When you come to with a hangover on a crowded beach, these are the songs you'll have dreamt about.",
  who: 'John Guttschall',
};
