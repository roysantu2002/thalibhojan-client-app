import { firestore } from "../utils/firebase"
import randomstring from "randomstring";

export const getInquiry = async (email) => {
  const db = firestore.collection("inquiry");
  const refInquiry = await db.where("email", "==", email).get();
  const refToken = await db.where("token", "!=", "").get();

  let doList = [];
  let tokenValue = "";

  refToken.forEach((doc) => {
    if (doc) tokenValue = doc.data().token;
  });

  refInquiry.forEach((doc) => {
    if (doc) doList.push(doc.data());
  });

  let querySnapshot = "Email Exists,+";

  if (doList.length < 1) {
    return db
      .doc(randomstring.generate(10))
      .set({ email: email, date: Date.now() })
      .then((querySnapshot) => "NA," + tokenValue)
      .catch((querySnapshot) => "Email Exists, ");
  } else {
    return querySnapshot;
  }
};
