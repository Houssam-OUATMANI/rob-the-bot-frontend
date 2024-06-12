import { Message } from "../types";

export function messageFactory(author: string, role : string, text : string) : Message {
    return {id : Date.now(), author, date: new Date(), role, text}
}