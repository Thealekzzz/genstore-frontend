/**
 * Функция подбирает для слова правильное окончание
 * @param {Number} num Число, на основании которого будет выбираться оконччание
 * @param {String} word Слово, для которого нужно подобрать окончание (без окончания)
 * @param {String[]} options Массив окончаний 1. Последняя цифра 0, 5 - 9, или число от 10 до 20, 2. Последняя цифра 1, 3. Остальное.
 * @returns Слово с правильным окончанием
 */
export default function wordEnding(num, word, options) {
  if (num % 10 === 0 || (num % 100 > 10 && num % 100 < 20) || [5, 6, 7, 8, 9].includes(num % 10)) {
    return word + options[0];
  } else if (num % 10 === 1) {
    return word + options[1];
  } else {
    return word + options[2];
  }
}
