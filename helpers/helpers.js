function generateAccountNumber() {
    const min = 1_000_000;
    const max = 9_999_999;
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

module.exports = {generateAccountNumber};
  