export function deepEqual(obj1, obj2) {
  // Проверяем, что оба аргумента являются объектами
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }

  // Получаем ключи объектов
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Проверяем количество ключей
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Рекурсивно сравниваем каждое поле объектов
  for (let key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
