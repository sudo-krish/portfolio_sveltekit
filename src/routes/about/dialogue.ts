export type DialogueNode = {
    speaker: "Player" | "Sudo Krish" | "System";
    text: string;
    options?: {
        text: string;
        nextId: string;
        unlock?: "skills" | "experience" | "lore";
    }[];
    nextId?: string;
    triggerCapture?: boolean;
    triggerAttack?: boolean; // Shakes the player sprite
    triggerDefend?: boolean; // Shakes the enemy sprite
};

export const dialogueScript: Record<string, DialogueNode> = {
    start: {
        speaker: "System",
        text: "A wild DATA ENGINEER appeared out of the cloud console! He looks sleep-deprived.",
        nextId: "intro"
    },
    intro: {
        speaker: "Sudo Krish",
        text: "Whoa there! Hold up! Are you here to audit my AWS bill? Because I swear I turned off those Redshift instances...",
        options: [
            { text: "No, I'm just looking for a JOIN.", nextId: "join_joke" },
            { text: "Yes. And I noticed your pipelines are failing.", nextId: "pipeline_failure" },
            { text: "Worse. I'm here for a technical interview.", nextId: "interview_start" }
        ]
    },

    // --- Path A: The JOIN Joke ---
    join_joke: {
        speaker: "Player",
        text: "Used 'I'M LOOKING FOR A JOIN!'",
        triggerAttack: true,
        nextId: "join_reply"
    },
    join_reply: {
        speaker: "Sudo Krish",
        text: "Ah, looking for love in all the wrong databases? Let me guess, you tried online dating but ended up with a CROSS JOIN and a million duplicates?",
        triggerDefend: true,
        options: [
            { text: "At least it wasn't a dropped production table.", nextId: "drop_table" },
            { text: "Let's test your Tech Stack instead.", nextId: "skills", unlock: "skills" }
        ]
    },
    drop_table: {
        speaker: "Sudo Krish",
        text: "Hey! We don't joke about dropping tables! I cry. I cry a lot. And then I spend 4 hours parsing through S3 bucket backups praying the CTO doesn't notice.",
        options: [
            { text: "Tell me about your real battle scars.", nextId: "experience", unlock: "experience" },
            { text: "I'll spare your tables. Here's an offer.", nextId: "catch_attempt" }
        ]
    },

    // --- Path B: Failing Pipelines ---
    pipeline_failure: {
        speaker: "Player",
        text: "Used 'YOUR PIPELINES ARE FAILING!'",
        triggerAttack: true,
        nextId: "pipeline_reply"
    },
    pipeline_reply: {
        speaker: "Sudo Krish",
        text: "Lies! Slander! It's just... uh... a feature! The unholy amalgamation of JSON wrapped in XML is just Tuesday for me. Standards are for other people!",
        triggerDefend: true,
        options: [
            { text: "But what about the NULL values?", nextId: "null_values", unlock: "lore" },
            { text: "Show me your architecture.", nextId: "skills", unlock: "skills" }
        ]
    },
    null_values: {
        speaker: "Sudo Krish",
        text: "Don't say that word! My nightmares literally involve NULL values chasing me around an infinite loop in Airflow. It's terrifying.",
        options: [
            { text: "What's your actual tech stack then?", nextId: "skills", unlock: "skills" },
            { text: "Sounds like you need a new job.", nextId: "catch_attempt" }
        ]
    },

    // --- Path C: The Technical Interview ---
    interview_start: {
        speaker: "Player",
        text: "Used 'I AM THE HIRING MANAGER!'",
        triggerAttack: true,
        nextId: "interview_reply"
    },
    interview_reply: {
        speaker: "Sudo Krish",
        text: "An interview?! Right now?! But I haven't inverted a binary tree on a whiteboard in months! Can't I just write a 500-line SQL CTE instead?",
        triggerAttack: true, // Shakes player back (emotional damage)
        options: [
            { text: "Fine. Whiteboard a SQL query.", nextId: "skills", unlock: "skills" },
            { text: "Tell me about a time things actually broke.", nextId: "experience", unlock: "experience" }
        ]
    },

    // --- Core "Item Unlock" Nodes ---

    // Skills Unlock
    skills: {
        speaker: "Player",
        text: "Used 'EXPLAIN YOUR ARCHITECTURE!'",
        triggerAttack: true,
        nextId: "skills_reply"
    },
    skills_reply: {
        speaker: "Sudo Krish",
        text: "My schema is star, and my pipelines are immaculate. I cast high-level spells using Python, SQL, and Spark. My shield is Docker, and my weapon is Airflow.",
        triggerDefend: true,
        nextId: "skills_effect"
    },
    skills_effect: {
        speaker: "System",
        text: "A critical hit! You obtained the [TECH STACK]! It was added to your KEY ITEMS.",
        options: [
            { text: "But can it handle scale?", nextId: "experience", unlock: "experience" },
            { text: "Are you powered by coffee?", nextId: "lore", unlock: "lore" }
        ]
    },

    // Experience Unlock
    experience: {
        speaker: "Player",
        text: "Used 'TELL ME ABOUT A TIME THINGS BROKE.'",
        triggerAttack: true,
        nextId: "experience_reply"
    },
    experience_reply: {
        speaker: "Sudo Krish",
        text: "Ouch. I've scaled pipelines to handle mountains of data... but there was that one time an Airflow DAG got stuck in an infinite loop for 4 days. The cloud bill was... impressive.",
        triggerDefend: true,
        nextId: "experience_effect"
    },
    experience_effect: {
        speaker: "System",
        text: "It's super effective! You obtained [BATTLE SCARS & EXP]! It was added to your KEY ITEMS.",
        options: [
            { text: "What else goes wrong?", nextId: "lore", unlock: "lore" },
            { text: "I've heard enough. Let's talk offers.", nextId: "catch_attempt" }
        ]
    },

    // Lore Unlock
    lore: {
        speaker: "Player",
        text: "Used 'WHAT ARE YOUR WEAKNESSES?'",
        triggerAttack: true,
        nextId: "lore_reply"
    },
    lore_reply: {
        speaker: "Sudo Krish",
        text: "My greatest weakness? Caring too much. Also, my blood type is currently cold-brew. If I don't drink coffee, my code compilation takes an extra 4 to 6 business days.",
        triggerDefend: true,
        nextId: "lore_effect"
    },
    lore_effect: {
        speaker: "System",
        text: "Sudo Krish's Sp. Defense was shattered! You obtained [DEVELOPER QUIRKS]!",
        options: [
            { text: "Let's test your Tech Stack.", nextId: "skills", unlock: "skills" },
            { text: "Throw Offer Letter!", nextId: "catch_attempt" }
        ]
    },

    // --- Capture Sequence ---
    catch_attempt: {
        speaker: "System",
        text: "You hurled a LUCRATIVE OFFER LETTER! It's super effective!",
        nextId: "catching",
        triggerCapture: true,
    },
};
