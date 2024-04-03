
export type ProductivityDataObjectType = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  productivitySeconds: number;
  timeSpentInLvim: number;
  timeSpentThinkingOrSearching: number;
  projectPath: string;
  commitMsg: string;
  languagesAndThereProductivity: string
};


export type LanguagesAndThereProductivityType = {
  language: string;
  productivity: number
};
