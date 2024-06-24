enum ProfileType {
  PUBLIC,
  PRIVATE
}

export interface UserType {
  id: string;
  userName: string;
  bio: string | null;
  email: string;
  followerCount: number;
  followingCount: number;
  imageUrl: string | null;
  name: string | null;
  postsCount: number;
  profileType: string;
}

export interface PostUrl {
  id: string;
  postId: string;
  url: string;
  index: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostType {
  id: string;
  userId: string;
  description: string;
  likesCount: number;
  commentCount: number;
  viewsCount: number;
  postUrlCount: number;
  typeOfPost: string;
  isCommentEnable: boolean;
  isLikeVisible: boolean;
  createdAt: string;
  updatedAt: string;
  postUrls: PostUrl[];
  user: UserType;
}

export interface CommentType {
  id: string;
  postId: string;
  userId: string;
  commentText?: string | null;
  commentCount: number;
  likesCount: number;
  commentType: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
  parentCommentId: string | null;
}

export interface FollowingUserType {
  id: string;
  followerId: string;
  followingId: string;
  following: {
    imageUrl: string | null;
    name: string | null;
    userName: string;
  };
}

export interface FollowerUserType {
  id: string;
  followerId: string;
  followingId: string;
  isAccepted: boolean;
  follower: {
    imageUrl: string | null;
    name: string | null;
    userName: string;
  };
}
