const AREAS = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

export function validate(form) {
  const errors = {};

  // Name
  if (!form.name.trim()) {
    errors.name = "Please enter your name";
  }

  // TeleBirr phone
  const phone = form.phone.replace(/\s/g, "");

  if (!phone) {
    errors.phone = "Please enter your TeleBirr number";
  } else if (!/^(?:\+251|0)9\d{8}$/.test(phone)) {
    errors.phone = "Use 09... or +2519... TeleBirr number";
  }

  // Delivery area
  if (!AREAS.includes(form.area)) {
    errors.area = "Please choose a delivery area";
  }

  // Notes
  if (form.notes.length > 200) {
    errors.notes = "Notes must be 200 characters or less";
  }

  return errors;
}
