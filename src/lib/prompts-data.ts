interface PromptEntry {
  actionPrompt: string;
  scriptureRef: string;
  scriptureText: string;
}

export interface PromptSeed extends PromptEntry {
  sortOrder: number;
}

const PROMPT_DATA: PromptEntry[] = [
  { actionPrompt: "Speak gently today.", scriptureRef: "Proverbs 15:1", scriptureText: "A gentle answer turns away wrath, but a harsh word stirs up anger." },
  { actionPrompt: "Rest without guilt today.", scriptureRef: "Matthew 11:28", scriptureText: "Come to me, all you who are weary and burdened, and I will give you rest." },
  { actionPrompt: "Be slower to react.", scriptureRef: "James 1:19", scriptureText: "Everyone should be quick to listen, slow to speak and slow to become angry." },
  { actionPrompt: "Encourage someone sincerely.", scriptureRef: "1 Thessalonians 5:11", scriptureText: "Therefore encourage one another and build each other up, just as in fact you are doing." },
  { actionPrompt: "Start the thing you've been avoiding.", scriptureRef: "Colossians 3:23", scriptureText: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters." },
  { actionPrompt: "Choose patience in one difficult moment.", scriptureRef: "Galatians 5:22", scriptureText: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness." },
  { actionPrompt: "Spend a few quiet minutes with God.", scriptureRef: "Psalm 46:10", scriptureText: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth." },
  { actionPrompt: "Let go of one unnecessary worry.", scriptureRef: "Matthew 6:34", scriptureText: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own." },
  { actionPrompt: "Be fully present in one conversation today.", scriptureRef: "Philippians 2:4", scriptureText: "Not looking to your own interests but each of you to the interests of the others." },
  { actionPrompt: "Practice gratitude for something ordinary.", scriptureRef: "1 Thessalonians 5:18", scriptureText: "Give thanks in all circumstances; for this is God's will for you in Christ Jesus." },
  { actionPrompt: "Forgive quickly instead of replaying the hurt.", scriptureRef: "Colossians 3:13", scriptureText: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you." },
  { actionPrompt: "Say less when anger rises.", scriptureRef: "Proverbs 17:27", scriptureText: "The one who has knowledge uses words with restraint, and whoever has understanding is even-tempered." },
  { actionPrompt: "Reach out to someone you've ignored.", scriptureRef: "Romans 12:18", scriptureText: "If it is possible, as far as it depends on you, live at peace with everyone." },
  { actionPrompt: "Do one thing with excellence today.", scriptureRef: "Ecclesiastes 9:10", scriptureText: "Whatever your hand finds to do, do it with all your might." },
  { actionPrompt: "Choose honesty even if it's uncomfortable.", scriptureRef: "Ephesians 4:25", scriptureText: "Therefore each of you must put off falsehood and speak truthfully to your neighbor, for we are all members of one body." },
  { actionPrompt: "Take a short walk and clear your mind.", scriptureRef: "Psalm 23:2", scriptureText: "He makes me lie down in green pastures, he leads me beside quiet waters." },
  { actionPrompt: "Pray before making that decision.", scriptureRef: "Proverbs 3:5-6", scriptureText: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
  { actionPrompt: "Be kind to yourself today.", scriptureRef: "Psalm 139:14", scriptureText: "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well." },
  { actionPrompt: "Don't rush everything today.", scriptureRef: "Ecclesiastes 3:1", scriptureText: "There is a time for everything, and a season for every activity under the heavens." },
  { actionPrompt: "Listen more carefully than usual.", scriptureRef: "James 1:19", scriptureText: "Everyone should be quick to listen, slow to speak and slow to become angry." },
  { actionPrompt: "Put your phone away for a while.", scriptureRef: "Psalm 46:10", scriptureText: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth." },
  { actionPrompt: "Let someone else speak first today.", scriptureRef: "Philippians 2:3", scriptureText: "Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves." },
  { actionPrompt: "Trust God with what you cannot control.", scriptureRef: "Proverbs 3:5", scriptureText: "Trust in the Lord with all your heart and lean not on your own understanding." },
  { actionPrompt: "Finish one small task completely.", scriptureRef: "Proverbs 14:23", scriptureText: "All hard work brings a profit, but mere talk leads only to poverty." },
  { actionPrompt: "Choose peace over proving a point.", scriptureRef: "Romans 12:18", scriptureText: "If it is possible, as far as it depends on you, live at peace with everyone." },
  { actionPrompt: "Speak life into someone today.", scriptureRef: "Proverbs 18:21", scriptureText: "The tongue has the power of life and death, and those who love it will eat its fruit." },
  { actionPrompt: "Pause before responding emotionally.", scriptureRef: "Proverbs 15:28", scriptureText: "The heart of the righteous weighs its answers, but the mouth of the wicked gushes evil." },
  { actionPrompt: "Spend time in stillness today.", scriptureRef: "Psalm 46:10", scriptureText: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth." },
  { actionPrompt: "Help someone without expecting recognition.", scriptureRef: "Matthew 6:3-4", scriptureText: "But when you give to the needy, do not let your left hand know what your right hand is doing, so that your giving may be in secret." },
  { actionPrompt: "Let today be simpler.", scriptureRef: "Luke 10:41-42", scriptureText: "'Martha, Martha,' the Lord answered, 'you are worried and upset about many things, but few things are needed—or indeed only one.'" },
  { actionPrompt: "Don't carry tomorrow's problems today.", scriptureRef: "Matthew 6:34", scriptureText: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own." },
  { actionPrompt: "Stay faithful in small things.", scriptureRef: "Luke 16:10", scriptureText: "Whoever can be trusted with very little can also be trusted with much, and whoever is dishonest with very little will also be dishonest with much." },
  { actionPrompt: "Admit where you need help.", scriptureRef: "2 Corinthians 12:9", scriptureText: "My grace is sufficient for you, for my power is made perfect in weakness." },
  { actionPrompt: "Take responsibility for one thing you've delayed.", scriptureRef: "Proverbs 12:24", scriptureText: "Diligent hands will rule, but laziness ends in slave labor." },
  { actionPrompt: "Speak truth kindly today.", scriptureRef: "Ephesians 4:15", scriptureText: "Speaking the truth in love, we will grow to become in every respect the mature body of him who is the head, that is, Christ." },
  { actionPrompt: "Choose understanding before judgment.", scriptureRef: "Romans 14:13", scriptureText: "Therefore let us stop passing judgment on one another. Instead, make up your mind not to put any stumbling block or obstacle in the way of a brother or sister." },
  { actionPrompt: "Slow down your pace today.", scriptureRef: "Psalm 46:10", scriptureText: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth." },
  { actionPrompt: "Rest your mind for a moment.", scriptureRef: "Isaiah 26:3", scriptureText: "You will keep in perfect peace those whose minds are steadfast, because they trust in you." },
  { actionPrompt: "Be intentional with your words.", scriptureRef: "Colossians 4:6", scriptureText: "Let your conversation be always full of grace, seasoned with salt, so that you may know how to answer everyone." },
  { actionPrompt: "Notice the good around you.", scriptureRef: "Psalm 118:24", scriptureText: "The Lord has done it this very day; let us rejoice today and be glad in it." },
  { actionPrompt: "Start your day with gratitude.", scriptureRef: "Psalm 100:4", scriptureText: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name." },
  { actionPrompt: "Resist the urge to compare yourself today.", scriptureRef: "Galatians 6:4", scriptureText: "Each one should test their own actions. Then they can take pride in themselves alone, without comparing themselves to someone else." },
  { actionPrompt: "Show kindness quietly.", scriptureRef: "Micah 6:8", scriptureText: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God." },
  { actionPrompt: "Take the next small step.", scriptureRef: "Joshua 1:9", scriptureText: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." },
  { actionPrompt: "Be patient with your growth.", scriptureRef: "Philippians 1:6", scriptureText: "Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus." },
  { actionPrompt: "Don't ignore your emotions today.", scriptureRef: "Psalm 34:18", scriptureText: "The Lord is near to the brokenhearted and saves those who are crushed in spirit." },
  { actionPrompt: "Pray honestly, not perfectly.", scriptureRef: "Romans 8:26", scriptureText: "In the same way, the Spirit helps us in our weakness. We do not know what we ought to pray for, but the Spirit himself intercedes for us through wordless groans." },
  { actionPrompt: "Spend time away from noise.", scriptureRef: "Mark 6:31", scriptureText: "Then, because so many people were coming and going that they did not even have a chance to eat, he said to them, 'Come with me by yourselves to a quiet place and get some rest.'" },
  { actionPrompt: "Let someone feel heard today.", scriptureRef: "Proverbs 18:13", scriptureText: "To answer before listening—that is folly and shame." },
  { actionPrompt: "Choose gentleness over harshness.", scriptureRef: "Proverbs 15:1", scriptureText: "A gentle answer turns away wrath, but a harsh word stirs up anger." },
  { actionPrompt: "Rest before burnout finds you.", scriptureRef: "Mark 6:31", scriptureText: "Come with me by yourselves to a quiet place and get some rest." },
  { actionPrompt: "Say thank you sincerely today.", scriptureRef: "Colossians 3:15", scriptureText: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful." },
  { actionPrompt: "Keep your promises today.", scriptureRef: "Matthew 5:37", scriptureText: "All you need to say is simply 'Yes' or 'No'; anything beyond this comes from the evil one." },
  { actionPrompt: "Give yourself grace while growing.", scriptureRef: "2 Corinthians 12:9", scriptureText: "My grace is sufficient for you, for my power is made perfect in weakness." },
  { actionPrompt: "Practice self-control in one area today.", scriptureRef: "Galatians 5:22-23", scriptureText: "The fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control." },
  { actionPrompt: "Be mindful of your thoughts.", scriptureRef: "Philippians 4:8", scriptureText: "Whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things." },
  { actionPrompt: "Encourage yourself with truth today.", scriptureRef: "Psalm 42:11", scriptureText: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God." },
  { actionPrompt: "Let go of bitterness slowly.", scriptureRef: "Ephesians 4:31-32", scriptureText: "Get rid of all bitterness, rage and anger, brawling and slander, along with every form of malice. Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you." },
  { actionPrompt: "Choose humility in one moment today.", scriptureRef: "Philippians 2:3", scriptureText: "Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves." },
  { actionPrompt: "Stay calm in small frustrations.", scriptureRef: "Proverbs 19:11", scriptureText: "A person's wisdom yields patience; it is to one's glory to overlook an offense." },
  { actionPrompt: "Be honest about what's weighing on you.", scriptureRef: "Psalm 62:8", scriptureText: "Trust in him at all times, you people; pour out your hearts to him, for God is our refuge." },
  { actionPrompt: "Spend less time trying to impress people.", scriptureRef: "Galatians 1:10", scriptureText: "Am I now trying to win the approval of human beings, or of God? Or am I trying to please people? If I were still trying to please people, I would not be a servant of Christ." },
  { actionPrompt: "Notice when you need rest.", scriptureRef: "Matthew 11:28", scriptureText: "Come to me, all you who are weary and burdened, and I will give you rest." },
  { actionPrompt: "Focus on today, not everything at once.", scriptureRef: "Matthew 6:34", scriptureText: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own." },
  { actionPrompt: "Let peace guide your response today.", scriptureRef: "Colossians 3:15", scriptureText: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace." },
  { actionPrompt: "Choose compassion over criticism.", scriptureRef: "Ephesians 4:32", scriptureText: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you." },
  { actionPrompt: "Speak with patience today.", scriptureRef: "Proverbs 15:18", scriptureText: "A hot-tempered person stirs up conflict, but the one who is patient calms a quarrel." },
  { actionPrompt: "Be dependable in small things.", scriptureRef: "Proverbs 20:6", scriptureText: "Many claim to have unfailing love, but a faithful person who can find?" },
  { actionPrompt: "Trust that small progress matters.", scriptureRef: "Zechariah 4:10", scriptureText: "Who dares despise the day of small things, since the seven eyes of the Lord that range throughout the earth will rejoice when they see the chosen capstone in the hand of Zerubbabel?" },
  { actionPrompt: "Make room for quiet today.", scriptureRef: "Psalm 46:10", scriptureText: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth." },
  { actionPrompt: "Encourage someone who seems tired.", scriptureRef: "Hebrews 10:24-25", scriptureText: "Let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, but encouraging one another." },
  { actionPrompt: "Stay steady even if progress feels slow.", scriptureRef: "Galatians 6:9", scriptureText: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up." },
  { actionPrompt: "Pray for someone quietly today.", scriptureRef: "Job 42:10", scriptureText: "After Job had prayed for his friends, the Lord restored his fortunes and gave him twice as much as he had before." },
  { actionPrompt: "Let go of what you can't fix today.", scriptureRef: "1 Peter 5:7", scriptureText: "Cast all your anxiety on him because he cares for you." },
  { actionPrompt: "Be careful with your tone today.", scriptureRef: "Proverbs 15:1", scriptureText: "A gentle answer turns away wrath, but a harsh word stirs up anger." },
  { actionPrompt: "Keep your heart soft.", scriptureRef: "Ezekiel 36:26", scriptureText: "I will give you a new heart and put a new spirit in you; I will remove from you your heart of stone and give you a heart of flesh." },
  { actionPrompt: "Be generous with kindness today.", scriptureRef: "Luke 6:38", scriptureText: "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap." },
  { actionPrompt: "Choose calm over chaos.", scriptureRef: "Isaiah 26:3", scriptureText: "You will keep in perfect peace those whose minds are steadfast, because they trust in you." },
  { actionPrompt: "Make time to reflect today.", scriptureRef: "Lamentations 3:40", scriptureText: "Let us examine our ways and test them, and let us return to the Lord." },
  { actionPrompt: "Respond with wisdom instead of impulse.", scriptureRef: "Proverbs 29:11", scriptureText: "Fools give full vent to their rage, but the wise bring calm in the end." },
  { actionPrompt: "Notice where God has been faithful.", scriptureRef: "Deuteronomy 7:9", scriptureText: "Know therefore that the Lord your God is God; he is the faithful God, keeping his covenant of love to a thousand generations of those who love him and keep his commandments." },
  { actionPrompt: "Be slower to complain today.", scriptureRef: "Philippians 2:14", scriptureText: "Do everything without grumbling or arguing." },
  { actionPrompt: "Practice contentment with what you have.", scriptureRef: "Hebrews 13:5", scriptureText: "Keep your lives free from the love of money and be content with what you have, because God has said, 'Never will I leave you; never will I forsake you.'" },
  { actionPrompt: "Release the pressure to be perfect.", scriptureRef: "2 Corinthians 12:9", scriptureText: "My grace is sufficient for you, for my power is made perfect in weakness." },
  { actionPrompt: "Be intentional with your time today.", scriptureRef: "Ephesians 5:15-16", scriptureText: "Be very careful, then, how you live—not as unwise but as wise, making the most of every opportunity, because the days are evil." },
  { actionPrompt: "Let your words bring peace today.", scriptureRef: "Colossians 4:6", scriptureText: "Let your conversation be always full of grace, seasoned with salt, so that you may know how to answer everyone." },
  { actionPrompt: "Take a break when you need one.", scriptureRef: "Mark 6:31", scriptureText: "Come with me by yourselves to a quiet place and get some rest." },
  { actionPrompt: "Stay grounded in what matters most.", scriptureRef: "Matthew 6:33", scriptureText: "But seek first his kingdom and his righteousness, and all these things will be given to you as well." },
  { actionPrompt: "Choose faith over fear in one area today.", scriptureRef: "Isaiah 41:10", scriptureText: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand." },
  { actionPrompt: "End today with gratitude.", scriptureRef: "Psalm 92:1", scriptureText: "It is good to praise the Lord and make music to your name, O Most High." },
];

export function getSortOrderForDate(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return (dayOfYear % 90) + 1;
}

export function getPromptForDate(date: Date): PromptSeed {
  const sortOrder = getSortOrderForDate(date);
  return { ...PROMPT_DATA[sortOrder - 1], sortOrder };
}

export function getTodayPrompt(): PromptSeed {
  return getPromptForDate(new Date());
}

export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getPromptHistory(count: number): Array<{
  dateKey: string;
  prompt: PromptSeed;
  date: Date;
}> {
  const today = new Date();
  const result = [];
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    result.push({
      dateKey: formatDateKey(date),
      prompt: getPromptForDate(date),
      date,
    });
  }
  return result;
}
