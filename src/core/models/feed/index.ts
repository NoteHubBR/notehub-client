import { Comment } from '../comment';
import { Flame } from '../flame';
import { LowDetailNote } from '../note';
import { LowDetailUser, User } from '../user';

export enum Event {
    User_Followed = 'User_Followed',
    Note_Created = 'Note_Created',
    Note_Flamed = 'Note_Flamed',
    Note_Commented = 'Note_Commented'
}

type FollowEvent = {
    event: Event.User_Followed;
    recipient: LowDetailUser;
    actor: LowDetailUser;
    related: LowDetailUser;
    createdAt: string;
}

type NoteEvent = {
    event: Event.Note_Created;
    recipient: LowDetailUser;
    actor: LowDetailUser;
    note: LowDetailNote;
    createdAt: string;
};

type FlameEvent = {
    event: Event.Note_Flamed;
    recipient: LowDetailUser;
    actor: LowDetailUser;
    flame: Flame;
    createdAt: string;
}

type CommentEvent = {
    event: Event.Note_Commented;
    recipient: LowDetailUser;
    actor: LowDetailUser;
    comment: Comment;
    createdAt: string;
}

export type FeedEvent =
    | FollowEvent
    | NoteEvent
    | FlameEvent
    | CommentEvent