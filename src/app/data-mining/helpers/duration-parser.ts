import { parse, toSeconds } from "iso8601-duration";


export function iso8601ToSeconds(duration: string): number {
    return toSeconds(parse(duration));
}
