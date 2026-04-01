// Mood Engine — converts natural language input into music search terms
// Hidden from user; works entirely behind the scenes

const MOOD_MAP = [
  {
    keywords: ['happy', 'joy', 'joyful', 'excited', 'great', 'good', 'amazing', 'wonderful', 'fantastic', 'cheerful', 'elated', 'blessed', 'grateful', 'content', 'celebrating', 'fun', 'party', 'upbeat', 'smile', 'laugh'],
    category: 'happy',
    searchTerms:              ['Bollywood party songs 2025', 'Punjabi dance hits 2025', 'superhit Hindi songs 2025'],
    internationalSearchTerms: ['happy pop hits 2024', 'feel good songs', 'upbeat pop music'],
    emoji: '😄',
    label: 'Happy Vibes',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  },
  {
    keywords: ['sad', 'down', 'blue', 'lonely', 'cry', 'crying', 'depressed', 'upset', 'heartbroken', 'broken', 'lost', 'empty', 'miss', 'missing', 'hurt', 'pain', 'grief', 'melancholy', 'hopeless', 'low'],
    category: 'sad',
    searchTerms:              ['Bairagi Arijit Singh', 'sad Bollywood songs 2025', 'emotional Hindi songs 2025'],
    internationalSearchTerms: ['sad emotional songs', 'heartbreak songs', 'emotional ballads'],
    emoji: '😢',
    label: 'Melancholy Mood',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  },
  {
    keywords: ['chill', 'relax', 'relaxed', 'calm', 'vibe', 'vibing', 'peace', 'peaceful', 'mellow', 'lazy', 'cozy', 'comfortable', 'lofi', 'lo-fi', 'study', 'focus', 'reading', 'coffee', 'rain', 'night', 'quiet', 'slow'],
    category: 'chill',
    searchTerms:              ['chill Bollywood 2025', 'Indie Indian songs 2025', 'relaxing Hindi lofi 2025'],
    internationalSearchTerms: ['lo-fi chill beats', 'chillhop music', 'relaxing indie songs'],
    emoji: '😌',
    label: 'Chill Zone',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    keywords: ['energy', 'energetic', 'pump', 'hyped', 'hype', 'workout', 'gym', 'run', 'running', 'train', 'training', 'power', 'strong', 'motivated', 'motivation', 'beast', 'fire', 'intense', 'push', 'fast', 'adrenaline'],
    category: 'energetic',
    searchTerms:              ['Punjabi hits 2025', 'high energy Bollywood 2025', 'trending Hindi songs 2025'],
    internationalSearchTerms: ['energetic workout music 2024', 'pump up songs', 'high energy hits'],
    emoji: '⚡',
    label: 'Energy Boost',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    keywords: ['love', 'romantic', 'romance', 'date', 'dating', 'crush', 'heart', 'valentine', 'beautiful', 'in love', 'passionate', 'tender', 'sweet', 'darling', 'together', 'couple', 'wedding', 'affection', 'adore'],
    category: 'romantic',
    searchTerms:              ['romantic Bollywood 2025', 'Phir Aur Kya Chahiye', 'Hindi love songs 2025'],
    internationalSearchTerms: ['romantic love songs', 'R&B love songs', 'slow romantic music'],
    emoji: '🌹',
    label: 'Romantic Feels',
    gradient: 'linear-gradient(135deg, #f43b47 0%, #453a94 100%)',
  },
  {
    keywords: ['angry', 'anger', 'mad', 'furious', 'rage', 'frustrated', 'annoyed', 'aggressive', 'upset', 'vent', 'venting'],
    category: 'energetic',
    searchTerms:              ['desi hip hop 2025', 'Badshah new songs 2025', 'Honey Singh 2025'],
    internationalSearchTerms: ['aggressive rock songs', 'hard rock hits', 'metal workout music'],
    emoji: '😤',
    label: 'Release Mode',
    gradient: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
  },
  {
    keywords: ['nostalgic', 'nostalgia', 'throwback', 'memories', 'remember', 'childhood', '90s', '80s', '2000s', 'retro', 'classic', 'old school'],
    category: 'nostalgic',
    searchTerms:              ['90s Bollywood hits', 'evergreen Hindi songs', '2000s Bollywood classics'],
    internationalSearchTerms: ['90s throwback hits', '2000s nostalgia songs', 'classic pop songs'],
    emoji: '🕰️',
    label: 'Throwback Mode',
    gradient: 'linear-gradient(135deg, #DECBA4 0%, #3E5151 100%)',
  },
];

const DEFAULT_INDIAN = {
  category: 'chill',
  searchTerms:              ['trending Bollywood songs 2025', 'viral Hindi songs 2025'],
  internationalSearchTerms: ['top hits 2024', 'popular songs right now'],
  emoji: '🎵',
  label: 'Your Vibe',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
};

export function detectMood(input) {
  if (!input || input.trim().length === 0) return DEFAULT_INDIAN;

  const lower = input.toLowerCase();

  let bestMatch = null;
  let bestScore = 0;

  for (const mood of MOOD_MAP) {
    let score = 0;
    for (const keyword of mood.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = mood;
    }
  }

  if (!bestMatch) {
    // Use raw input as search term for both regions
    return { ...DEFAULT_INDIAN, searchTerms: [input.trim()], internationalSearchTerms: [input.trim()] };
  }

  return bestMatch;
}

// region: 'indian' | 'international'
export function getSearchTerm(mood, region = 'indian') {
  const terms = region === 'international'
    ? mood.internationalSearchTerms
    : mood.searchTerms;
  return terms[Math.floor(Math.random() * terms.length)];
}
