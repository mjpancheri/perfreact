module.exports = () => {
  const data = {
    products: [],
  }

  const titles = [
    'Camiseta',
    'Calça',
    'Bermuda',
    'Blusa',
    'Vestido',
    'Saia',
    'Luva',
    'Chapeu',
    'Bone',
    'Top'
  ];

  for (let i = 0; i < 1000; i++) {
    data.products.push({
      id: i + 1,
      price: Math.round(Math.random() * 100),
      title: `${titles[Math.floor((Math.random() * 10) % 10)]} ${i + 1}`,
      isWish: false
    })
  }

  return data;
}