import { setupWorker } from "msw";
import { handlers } from "./hadlers";

export const worker = setupWorker(...handlers);