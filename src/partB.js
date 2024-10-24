export const findMinimumUserSet = (moduleUsage) => {
  const allUsers = new Set();
  let modules = [];

  const authModules = Object.keys(moduleUsage.auth_module);
  authModules.forEach((mod) => {
    const userSet = new Set(moduleUsage.auth_module[mod]);
    modules.push(userSet);
    userSet.forEach((user) => allUsers.add(user));
  });

  const contentModules = Object.keys(moduleUsage.content_module);
  contentModules.forEach((mod) => {
    const userSet = new Set(moduleUsage.content_module[mod]);
    modules.push(userSet);
    userSet.forEach((user) => allUsers.add(user));
  });

  const minimumUserSet = [];

  while (modules.length > 0) {
    let bestUser = null;
    let bestCoverage = 0;

    allUsers.forEach((user) => {
      let coverage = 0;
      modules.forEach((modSet) => {
        if (modSet.has(user)) {
          coverage++;
        }
      });

      if (coverage > bestCoverage) {
        bestCoverage = coverage;
        bestUser = user;
      }
    });

    if (bestUser) {
      minimumUserSet.push(bestUser);
      modules = modules.filter((modSet) => !modSet.has(bestUser));
    }
  }

  return minimumUserSet;
};
