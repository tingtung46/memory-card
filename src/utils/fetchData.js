export const fetchData = async (id, retries) => {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/characters/${id}/full`, {
      mode: "cors",
    });

    if (res.status === 429) {
      return retryFetch(id, retries, "Too many request 429 status code");
    } else {
      return res.json();
    }
  } catch (error) {
    retryFetch(id, retries, error);
  }
};

const retryFetch = (id, retries, error) => {
  if (retries) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await fetchData(id, retries - 1));
      }, 2000);
    });
  } else {
    console.error("Could not fetch character ", error);
  }
};
