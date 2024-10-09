/*
reNamso v2.0 is th new and modern Namso CCGEN.
RE-WRITED BY YAEL MASSIEU.
Instagram: @is.leay
Portfolio: https://yael.pages.dev/
*/
document.addEventListener('DOMContentLoaded', () => {
  showCurrentYear();
  document.getElementById('generar').addEventListener('click', ()=> {
    const maxCards = 100;
    const binInput = document.getElementById('ccpN').value;
    generateCardNumbers(binInput, maxCards);
  });
  document.getElementById('ccpN').addEventListener('change', addXToBin);
  document.getElementById('cleanText').addEventListener('click', resetTextarea);
});

function addXToBin() {
  const bin = document.getElementById('ccpN').value;
  let maxLengthCard;
  const cardBrand = getCardBrand(bin);
  switch (cardBrand) {
    case 'American Express':
      maxLengthCard = 15;
      break;
    case 'Diners Club':
      maxLengthCard = 14;
      break;
    default:
      maxLengthCard = 16;
      break;
  }
  const newBin = bin.padEnd(maxLengthCard, 'x');
  document.getElementById('ccpN').value = newBin;
}

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const format = (input, length, fillChar = '0', padding = 0) => {
  let result = '' + input;
  length = Number.parseFloat(length);
  if (!fillChar || !padding) {
    fillChar = '0';
    padding = 0;
  }
  const actuaLength = result.length;
  if (actuaLength < length) {
    result = padding === 0 ? fillChar.repeat(length - actuaLength) + result : result + fillChar.repeat(length - actuaLength);
  }
  return result;
};

function generateCardNumbers(cardBin, maxCards) {
  maxCards = maxCards || 1;
  const limitOfCards = Math.min(Math.max(parseInt(document.getElementById('ccghm').value), 1), 100);
  let result = '';
  if (cardBin) {
    const formatOfGen = '';
    let isGenerated, isValidC, generatedCard;
    for (let i = 1; i <= limitOfCards; i++) {
      const binCard = cardBin;
      const checkCardBrand = getCardBrand(cardBin);
      isGenerated = false;
      isValidC = false;
      generatedCard = '';
      for (let i = maxCards; i >= 1; i--) {
        document.getElementById('output2').value = 'Generating...';
        generatedCard = randomSustitute(binCard, 'x', '0123456789');
        const formattedCardNumber = deleteInvalidShits(generatedCard, ' -/abcdefghijklmnopqrstuvwyzABCDEFGHIJLMNOPQRSTUVWYZ');
        isGenerated = isValidLuhn(formattedCardNumber);
        isValidC = isValidChecksum(formattedCardNumber, checkCardBrand);
        if (isGenerated && isValidC) break;
      }
      if (isGenerated && isValidC) {
        const selectedSeparatorIndex = document.getElementById('ccnsp').selectedIndex;
        const separator = (selectedSeparatorIndex === 1) ? ' ' : (selectedSeparatorIndex === 2) ? '-' : '';
        let formattedNumber = '';
        for (let i = 0; i < generatedCard.length; i++) {
          const char = (generatedCard[i] === ' ') ? separator : generatedCard[i];
          formattedNumber += char;
        }
        let expDate = '';
        if (document.getElementById('ccexpdat').checked) {
          const currentDate = new Date();
          const month = (document.getElementById('emeses').value === 'rnd') ? format(randomNum(1, 12), 2, '0', 0) : document.getElementById('emeses').value;
          const year = (document.getElementById('eyear').value === 'rnd') ? (currentDate.getFullYear() + randomNum(2, 6)) : document.getElementById('eyear').value;
          expDate = `|${month}|${year}`;
        }
        const randomCVV = (document.getElementById('eccv').value === 'rnd' && document.getElementById('ccvi').checked)
          ? ((formattedNumber.startsWith('34') || formattedNumber.startsWith('37'))
            ? (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000)
            : (Math.floor(Math.random() * (998 - 112 + 1)) + 112))
          : document.getElementById('eccv').value;
        result += `${formatOfGen}${formattedNumber}${expDate}${(document.getElementById('ccvi').checked) ? ('|' + randomCVV) : ''}${(document.getElementById('ccbank').checked) ? ('|' + checkCardBrand) : ''}\n`;
      } else {
        result = 'Error';
        break;
      }
    }
    document.getElementById('output2').value = result;
  }
}

function getCardBrand(cardNumber) {
  const brands = [
    { pattern: /^4/, name: 'Visa' },
    { pattern: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01])/i, name: 'Mastercard' },
    { pattern: /^(6011|65|64[4-9]|622)/, name: 'Discover' },
    { pattern: /^(34|37)/, name: 'American Express' },
    { pattern: /^(30[0-5]|309|36|38|39)/, name: 'Diners Club' },
    { pattern: /^35(2[89]|[3-8][0-9])/, name: 'JCB' }
  ];
  cardNumber = deleteInvalidShits(cardNumber, ' -/abcdefghijklmnopqrstuvwyzABCDEFGHIJLMNOPQRSTUVWYZ');
  for (let i = 0; i < brands.length; i++) {
    if (cardNumber.match(brands[i].pattern)) {
      return brands[i].name;
    }
  }
  return 'Unknown';
}

function isValidChecksum(cardNumber) {
  const weights = [2, 1];
  let sum = 0;
  let index = 0;
  for (let i = cardNumber.length - 2; i >= 0; i--) {
    const result = parseInt(cardNumber[i], 10) * weights[index % weights.length];
    sum += Math.floor(result / 10) + (result % 10);
    index++;
  }
  const remainder = 10 - (sum % 10);
  const checksum = (10 - ((sum + remainder) % 10)) % 10;
  return parseInt(cardNumber[cardNumber.length - 1], 10) === checksum ? checksum : parseInt(cardNumber[cardNumber.length - 1], 10);
}

function isValidLuhn(cardNumber) {
  let sum = 0;
  let alternate = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);
    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    alternate = !alternate;
  }
  return (sum % 10) === 0;
}

function deleteInvalidShits(input, invalidChars) {
  let result = '';
  for (let i = 0; i < input.length; i++) {
    const justInputs = input.charAt(i);
    if (invalidChars.indexOf(justInputs) === -1) result += justInputs;
  }
  return result;
}

function randomSustitute(input, charsToReplace, replacementChars = '0123456789') {
  let result = '';
  for (let i = 0; i < input.length; i++) {
    const justInputs = input.charAt(i);
    if (charsToReplace.indexOf(justInputs) === -1) result += justInputs;
    else result += replacementChars.charAt(Math.floor(Math.random() * replacementChars.length));
  }
  return result;
}

const resetTextarea = () => document.querySelector('#output2').value = '';
const showCurrentYear = () => document.querySelector('#date').textContent = new Date().getFullYear();
