/**
 * GET guestbook comments
 * @returns An array of comments.
 */
export const getAllComments = async () => {
  const data = await fetch("/api/guestbook", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await data.json();

  return response;
};

/**
 * POST guestbook comment
 * @param comment The user comment.
 * @returns An object of the comment.
 */
export const postComment = async (comment) => {
  const data = await fetch("/api/guestbook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment: comment }),
  });
  const response = await data.json();

  return response;
};

/**
 * DELETE guestbook comment
 * @param uid The user id.
 * @param cid The user comment.
 */
export const deleteComment = async (uid, cid) => {
  await fetch("/api/guestbook", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: uid, cid: cid }),
  });
};
