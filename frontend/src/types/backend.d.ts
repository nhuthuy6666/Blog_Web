interface IAuthor{
  authorId: string;
  firstname: string;
  lastname: string;
  birthday: Date;
  business: string;
  address: string;
  describe: string;
}

interface IAccount{
  Author: IAuthor;
  accountId: string;
  avatar: string;
  name: string;
  password: string;
  joinDate: Date;
  email: string;
  link: string;
  followers: number;
  createdAt: string;  
  updatedAt: string;
}

interface IBlog{
  _id: string;
  Account: IAccount;
  blogId: number;
  title: string;
  postDate: Date;
  content: string;
  likes: number;
  views: number;
  comments: number;
  shares: number;
}

interface IComment{
  Account: IAccount;
  Blog: IBlog;
  commentId: string;
  content: string;
  likes: number;
  parent: IComment | null;
  children: IComment[];
  createdAt: string;  
  updatedAt: string;
}

interface IAchievement{
  Account: IAccount;
  achievementId: string;
  name: string;
  type: string;
}

interface IFollow{
  Account: IAccount;
  followId: string;
  listAccount: IAccount[];
}

interface ISave{
  Account: IAccount;
  saveId: string;
  listBlog: IBlog[];
}

interface ISkill{
  Author: IAuthor;
  skillId: string;
  name: string;
  percent: string;
}

interface User{
  accountId: string;
  name: string;
}
