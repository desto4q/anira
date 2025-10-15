export const scale_up_img = (url: string) => {
  const newUrl = url.replace(
    /\/thumbnail\/(\d+)x(\d+)\//,
    (_, w, h) =>
      `/thumbnail/${String(Number(w) * 3)}x${String(Number(h) * 3)}/`,
  );
  return newUrl;
};

export const extract_episode_id = (str: string) => {
  const match = str.match(/\d+$/);
  return match ? Number(match[0]) : null;
};
