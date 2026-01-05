
export interface ProgramItem {
  id: string;
  time: string;
  title: string;
  description: string[];
  location: string;
  icon: string;
}

export interface RoomImage {
  id: string;
  url: string;
  name: string;
}

export interface ProgramData {
  agency: string;
  location: string;
  date: string;
  duration: string;
  items: ProgramItem[];
}
