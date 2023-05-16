// Utility functions.

import { STATUS_CHOICES } from "./constants";

// Get readable french date from API json.
export function jsonDateToFrenchString(jsonDate) {
  // const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
  const event = new Date(Date.parse(jsonDate));
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return event.toLocaleDateString('fr-FR', options);
}

// Convert API status to readable string. 
export function statusToString(st) {
  if (st in STATUS_CHOICES) {
    return STATUS_CHOICES[st];
  }
  return st;
}