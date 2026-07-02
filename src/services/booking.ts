export function getBookingLink(
  mode: string,
  state: string = "Karnataka"
): {
  government?: string;
  redbus?: string;
  other?: string;
} {
  mode = mode.toLowerCase();
  if (mode === "bus") {
  let government = "";

  switch (state.toLowerCase()) {
    case "karnataka":
      government = "https://ksrtc.in";
      break;

    case "tamil nadu":
      government = "https://www.tnstc.in";
      break;

    case "kerala":
      government = "https://onlineksrtcswift.com";
      break;

    case "andhra pradesh":
      government = "https://www.apsrtconline.in";
      break;

    case "telangana":
      government = "https://www.tsrtconline.in";
      break;

    case "maharashtra":
      government = "https://msrtc.maharashtra.gov.in";
      break;
  }

  return {
    government,
    redbus: "https://www.redbus.in",
  };
}

  if (mode === "train") {
  return {
    other: "https://www.irctc.co.in",
  };
}
if (mode === "flight") {
  return {
    other: "https://www.makemytrip.com/flights",
  };
}
return {};

  
}