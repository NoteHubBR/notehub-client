import { Comment } from '../comment';
import { Flame } from '../flame';
import { LowDetailNote } from '../note';
import { LowDetailUser } from '../user';

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
    created_at: string;
}

type NoteEvent = {
    event: Event.Note_Created;
    recipient: LowDetailUser;
    actor: LowDetailUser;
    note: LowDetailNote;
    created_at: string;
};

type FlameEvent = {
    event: Event.Note_Flamed;
    recipient: LowDetailUser;
    actor: LowDetailUser;
    flame: Flame;
    created_at: string;
}

type CommentEvent = {
    event: Event.Note_Commented;
    recipient: LowDetailUser;
    actor: LowDetailUser;
    comment: Comment;
    created_at: string;
}

export type FeedEvent =
    | FollowEvent
    | NoteEvent
    | FlameEvent
    | CommentEvent