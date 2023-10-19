export const convertFirebaseTimeStampToJs = (time) => {
  if (time !== null && time !== undefined) {
    const fireBaseTime = new Date(
      time.seconds * 1000 + time.nanoseconds / 1000000 // Fix typo here
    );

    const date = fireBaseTime.toLocaleDateString();
    const timeString = fireBaseTime.toLocaleTimeString();

    return `${date} ${timeString}`;
  }

  // Return an empty string or handle the case when time is undefined or null
  return "";
};
