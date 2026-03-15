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
};

export const dialogueScript: Record<string, DialogueNode> = {
    start: { speaker: "System", text: "A wild Data Engineer appeared out of the cloud console!", nextId: "intro" },
    intro: {
        speaker: "Sudo Krish",
        text: "Whoa there! Hold up! Are you here to audit my AWS bill? Because I swear those Redshift instances were turned off...",
        options: [
            { text: "Relax, I'm just exploring.", nextId: "exploring" },
            { text: "Who even are you?", nextId: "whoami" },
            { text: "Show me your stats!", nextId: "what_do" },
        ],
    },
    whoami: {
        speaker: "Sudo Krish",
        text: "I'm a Data Engineer! I wrestle with unruly data schemas by day and debug obscure Airflow failures by night. It's a glamorous life.",
        options: [
            { text: "What's in your arsenal?", nextId: "skills", unlock: "skills" },
            { text: "Where have you battled before?", nextId: "experience", unlock: "experience" },
        ],
    },
    exploring: {
        speaker: "Sudo Krish",
        text: "Phew. Okay. Exploration is highly encouraged! Just... don't drop my production tables while you're at it, okay?",
        options: [
            { text: "What exactly do you do?", nextId: "what_do" },
            { text: "Any epic war stories?", nextId: "experience", unlock: "experience" },
        ],
    },
    what_do: {
        speaker: "Sudo Krish",
        text: "I build massive data pipelines. Think of me as a digital plumber, but instead of water, it's terabytes of Jason strings... I mean, JSON strings.",
        options: [
            { text: "What tools do you equip?", nextId: "skills", unlock: "skills" },
            { text: "Do you have any weird quirks?", nextId: "lore", unlock: "lore" },
        ],
    },
    skills: {
        speaker: "Sudo Krish",
        text: "I cast high-level spells using Python, SQL, and Spark. I also have a passive buff for AWS and Docker orchestration.",
        nextId: "skills_get",
    },
    skills_get: {
        speaker: "System",
        text: "You obtained the [TECH STACK]! It was added to your KEY ITEMS.",
        options: [
            { text: "Check his battle history.", nextId: "experience", unlock: "experience" },
            { text: "Ask for hidden lore.", nextId: "lore", unlock: "lore" },
            { text: "I choose you! (Hire)", nextId: "catch_attempt" },
        ],
    },
    experience: {
        speaker: "Sudo Krish",
        text: "I've scaled pipelines to handle mountains of data without flinching. Optimized queries so fast, they travel back in time. Mostly.",
        nextId: "exp_get",
    },
    exp_get: {
        speaker: "System",
        text: "You obtained [BATTLE SCARS & EXP]! It was added to your KEY ITEMS.",
        options: [
            { text: "Inspect his weapons (Tech Stack).", nextId: "skills", unlock: "skills" },
            { text: "Ask for hidden lore.", nextId: "lore", unlock: "lore" },
            { text: "I choose you! (Hire)", nextId: "catch_attempt" },
        ],
    },
    lore: {
        speaker: "Sudo Krish",
        text: "My hidden weakness? Undocumented schema changes. Also, if I don't drink coffee, my code compilation takes an extra 4 business days.",
        nextId: "lore_get",
    },
    lore_get: {
        speaker: "System",
        text: "You obtained [DEVELOPER QUIRKS]! It was added to your KEY ITEMS.",
        options: [
            { text: "Inspect his weapons (Tech Stack).", nextId: "skills", unlock: "skills" },
            { text: "Check his battle history.", nextId: "experience", unlock: "experience" },
            { text: "I choose you! (Hire)", nextId: "catch_attempt" },
        ],
    },
    catch_attempt: {
        speaker: "System",
        text: "You hurled an OFFER LETTER! It's super effective!",
        nextId: "catching",
        triggerCapture: true,
    },
};
