import { useState, useEffect } from "react";

// Mongo does not allow for data base names to have spaces.
// We use this hook to create a space-less dbName to connect
// to mongo while displaying whatever dbName was chosen on the FE.

//Update this prevent other  special characters too

function useRemoveSpace(title) {
  const [urlTitle, setUrlTitle] = useState(title);
  useEffect(() => {
    if (title != null) {
      const remove = title.replace(/\s+/g, "");
      setUrlTitle(remove);
    }
  });

  return [urlTitle, setUrlTitle];
}

export default useRemoveSpace;
