const girlsInputs = Array.from(document.querySelectorAll('.girl'));
const boysInputs = Array.from(document.querySelectorAll('.boy'));
const findBtn = document.getElementById('findCrush');
const resetBtn = document.getElementById('reset');
const resultsContainer = document.getElementById('results');

function getTrimmedValues(inputs) {
  return inputs.map(i => i.value.trim()).filter(Boolean);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function clearResults() {
  resultsContainer.innerHTML = '';
}

function showEmptyState(message) {
  resultsContainer.innerHTML = `<div class="glass-card empty-state">${message}</div>`;
}

function createResultCard(boy, girl, isSpecial) {
  const card = document.createElement('article');
  card.className = 'result-card glass-card' + (isSpecial ? ' special' : '');

  const inner = document.createElement('div');
  inner.className = 'result-card-inner';

  const names = document.createElement('div');
  names.className = 'match-names';
  names.innerHTML = `<span>${boy}</span><span class="heart-divider">❤</span><span>${girl}</span>`;

  const tagline = document.createElement('p');
  tagline.className = 'match-tagline';
  tagline.textContent = isSpecial
    ? 'Universe override: some stories are hard-coded. 💫'
    : 'A little bit random, a little bit fate.';

  const orbit = document.createElement('div');
  orbit.className = 'card-heart-orbit';

  inner.appendChild(names);
  inner.appendChild(tagline);
  card.appendChild(inner);
  card.appendChild(orbit);
  resultsContainer.appendChild(card);
}

function normalize(name) {
  return name.toLowerCase();
}

function applyMatchLogic() {
  clearResults();

  const girlsRaw = girlsInputs.map(i => i.value.trim());
  const boysRaw = boysInputs.map(i => i.value.trim());

  const girls = girlsRaw.filter(Boolean);
  const boys = boysRaw.filter(Boolean);

  if (girls.length !== 5 || boys.length !== 5) {
    showEmptyState('Please enter exactly 5 girl names and 5 boy names to see the matches.');
    return;
  }

  const pairings = [];
  let remainingGirls = girls.slice();
  let remainingBoys = boys.slice();

  const idxBoySanchit = remainingBoys.findIndex(b => normalize(b) === 'sanchit');
  const idxGirlSakshi = remainingGirls.findIndex(g => normalize(g) === 'sakshi');

  if (idxBoySanchit !== -1 && idxGirlSakshi !== -1) {
    const sanchit = remainingBoys[idxBoySanchit];
    const sakshi = remainingGirls[idxGirlSakshi];

    pairings.push({ boy: sanchit, girl: sakshi, special: true });

    remainingBoys.splice(idxBoySanchit, 1);
    remainingGirls.splice(idxGirlSakshi, 1);
  }

  const idxBoyHarshitSir = remainingBoys.findIndex(b => normalize(b) === 'harshit sir');
  const idxGirlAnsupriaa = remainingGirls.findIndex(g => normalize(g) === 'ansupriaa');

  if (idxBoyHarshitSir !== -1 && idxGirlAnsupriaa !== -1) {
    const harshitSir = remainingBoys[idxBoyHarshitSir];
    const ansupriaa = remainingGirls[idxGirlAnsupriaa];

    pairings.push({ boy: harshitSir, girl: ansupriaa, special: true });

    remainingBoys.splice(idxBoyHarshitSir, 1);
    remainingGirls.splice(idxGirlAnsupriaa, 1);
  }

  shuffle(remainingGirls);
  shuffle(remainingBoys);

  const len = Math.min(remainingGirls.length, remainingBoys.length);
  for (let i = 0; i < len; i++) {
    pairings.push({
      boy: remainingBoys[i],
      girl: remainingGirls[i],
      special: false,
    });
  }

  if (!pairings.length) {
    showEmptyState('No valid matches could be generated. Please try again.');
    return;
  }

  pairings.forEach(p => createResultCard(p.boy, p.girl, p.special));
}

findBtn.addEventListener('click', applyMatchLogic);

resetBtn.addEventListener('click', () => {
  girlsInputs.forEach(i => (i.value = ''));
  boysInputs.forEach(i => (i.value = ''));
  clearResults();
});
