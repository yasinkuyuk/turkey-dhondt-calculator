export default (parties, totalDeputyCount) => {
  const partyArray = Object.entries(parties).map(([party, voteCount]) => ({
    party,
    voteCount,
  }));

  partyArray.sort((a, b) => b.voteCount - a.voteCount);

  const deputyCounts = new Array(partyArray.length).fill(0);

  for (let i = 0; i < totalDeputyCount; i++) {
    let nextQuotient = 0;
    let nextPartyIndex = 0;
    for (let j = 0; j < partyArray.length; j++) {
      const quotient = partyArray[j].voteCount / (deputyCounts[j] + 1);
      if (quotient > nextQuotient) {
        nextQuotient = quotient;
        nextPartyIndex = j;
      }
    }

    deputyCounts[nextPartyIndex]++;
  }

  const deputyCountsObj = {};
  for (let i = 0; i < partyArray.length; i++) {
    deputyCountsObj[partyArray[i].party] = deputyCounts[i];
  }

  return deputyCountsObj;
};
