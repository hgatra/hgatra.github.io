export interface Project {
  name: string;
  description: string;
  tags: string[];
  techStacks: string[];
  projectUrl: string;
  githubUrl: string;
  imageUrls: string[];
  startDate: string;
  endDate: string;
}

export interface Post {
  _id: string;
  title: string;
  tags: string[];
  createdAt: string;
  lastChangedAt: string;
  content: string;
}

export interface DetailPost extends Post {
  publishType: 'view' | string;
  publishedAt: string | null;
  permalink: string | null;
  shortId: string;
  lastChangeUser: UserMetadata;
  userPath: string;
  teamPath: string | null;
  readPermission: 'guest' | 'signed_in' | string;
  writePermission: 'signed_in' | string;
  publishLink: string;
}

export interface UserMetadata {
  name: string;
  photo: string;
  biography: string | null;
  userPath: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

export interface Profile {
  name: string;
  titles: string[];
  description: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface TechStack {
  name: string;
  icon?: string;
  category?: string;
}
