import { handleIntakeRequest } from "./intake.js";

export default {
  async fetch(request, env) {
    return handleIntakeRequest(request, env);
  },
};
