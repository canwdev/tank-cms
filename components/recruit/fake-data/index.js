var faker = require('faker'),
fs = require('fs')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const list = []

for (let i = 0; i < 50; i++) {
  list.push({
    title: faker.name.jobTitle(),
    desc: faker.lorem.paragraphs(),
    t_category_id: getRandomInt(1, 3),
    t_area_id: getRandomInt(4, 6),
    t_job_id: getRandomInt(7, 10)
  })
}

fs.writeFileSync('./dist.json', JSON.stringify(list, null, 2), {encoding: 'utf8'})
