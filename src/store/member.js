import memoize from "proxy-memoize";

import { proxyWithComputed } from "valtio/utils";

function MemberInformation() {
  return {
    member: {
      name: "reaper",
      age: 10,
    },
    memberEdit: {
      name: "reaper.old",
      age: 10,
    },
  };
}

export const memberStore = proxyWithComputed(new MemberInformation(), {
  isEdited: memoize(({ member, memberEdit }) => {
    const keys = Object.keys(member);
    return keys.some((k) => member[k] !== memberEdit[k]);
  }),
});
